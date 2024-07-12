import React, {useState, useCallback} from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';
import AssignmentDetails from "../components/games/AssignmentDetails";
import AlgorithmResults from "../components/games/AlgorithmResults";
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";
import {fetchAlgorithmResults, calculateAssignmentTime} from "./commonFunctions";

const UsersSolveProblem = () => {
    const [graphData] = useState(generateRandomGraph());
    const nodeIds = graphData.nodes.map(node => node.id);
    const numProcessors = graphData.num_processors || 4;
    const processors = Array.from({length: numProcessors}, (_, i) => `P${i + 1}`);
    const nodePredecessors = nodeIds.reduce((acc, nodeId) => {
        acc[nodeId] = graphData.edges.filter(edge => edge.target === nodeId).map(edge => edge.source);
        return acc;
    }, {});

    const [assignments, setAssignments] = useState({});
    const [finished, setFinished] = useState(false);
    const [algorithmResults, setAlgorithmResults] = useState(null);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [currentProcessorTimes, setCurrentProcessorTimes] = useState(processors.reduce((acc, processor) => ({
        ...acc,
        [processor]: 0
    }), {}));

    const handleAssignment = useCallback((newAssignments) => {
        setAssignments((prevAssignments) => {
            const trulyNewAssignments = Object.entries(newAssignments)
                .filter(([node, processor]) => !prevAssignments[node] || prevAssignments[node] !== processor)
                .reduce((acc, [node, processor]) => {
                    acc[node] = processor;
                    return acc;
                }, {});

            const updatedAssignments = {...prevAssignments, ...trulyNewAssignments};
            const updatedProcessorTimes = {...currentProcessorTimes};
            const updatedScheduledTasks = [...scheduledTasks];

            for (const [node, processor] of Object.entries(trulyNewAssignments)) {
                const startTime = calculateAssignmentTime(node, processor, updatedAssignments, updatedScheduledTasks, updatedProcessorTimes, graphData);
                const nodeWeight = graphData.nodes.find(n => n.id === node).weight;
                const endTime = startTime + nodeWeight;

                updatedScheduledTasks.push({node, processor, startTime, endTime});
                updatedProcessorTimes[processor] = endTime;
            }

            setScheduledTasks(updatedScheduledTasks);
            setCurrentProcessorTimes(updatedProcessorTimes);
            return updatedAssignments;
        });
        setFinished(false);
    }, [currentProcessorTimes, scheduledTasks]);

    const handleFinished = async () => {
        try {
            const results = await fetchAlgorithmResults();
            setAlgorithmResults(results);
            setFinished(true);
        } catch (error) {
            console.error('Error fetching algorithm results:', error);
        }
    };

    const resetState = () => {
        setAssignments({});
        setFinished(false);
        setAlgorithmResults(null);
        setScheduledTasks([]);
        setCurrentProcessorTimes(processors.reduce((acc, processor) => ({...acc, [processor]: 0}), {}));
    };

    const userEndTime = scheduledTasks.length > 0
        ? Math.max(...scheduledTasks.map(task => task.endTime))
        : 0;

    const graphDataStr = encodeURIComponent(JSON.stringify(graphData));

    return (
        <div className={"mb-4 p-3"}>
            <h1>Users solve problem</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                        <GraphComponent graphData={graphData}/>
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={processors}
                            nodePredecessors={nodePredecessors}
                            assignments={assignments}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                            onRefresh={resetState} // Pass the resetState function as a prop
                        />
                        {Object.keys(assignments).length === nodeIds.length && !finished && (
                            <button className="btn btn-primary mt-2" onClick={handleFinished}>
                                Finished
                            </button>
                        )}
                    </div>
                    <div className="col-12 col-md-5">
                        <AssignmentDetails assignments={assignments} scheduledTasks={scheduledTasks}
                                           maxTime={userEndTime} finished={finished}/>
                        <AlgorithmResults algorithmResults={algorithmResults} graphDataStr={graphDataStr}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSolveProblem;
