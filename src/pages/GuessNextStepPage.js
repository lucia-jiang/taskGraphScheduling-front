import React, {useState, useEffect, useCallback} from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import axios from 'axios';
import graphData from '../graph-examples-json/graph-2.json';

const fetchHLFETSteps = async () => {
    try {
        const response = await axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, {
            headers: {'Content-Type': 'application/json'}
        });

        const filteredSteps = response.data.filter(step => step.details && step.details.processor);
        console.log(filteredSteps);
        return filteredSteps;
    } catch (error) {
        console.error('Error fetching HLFET steps:', error);
        throw error;
    }
};

const calculateAssignmentTime = (node, processor, assignments, scheduledTasks, currentProcessorTimes) => {
    let maxPredecessorEndTime = 0;
    const predecessors = graphData.edges.filter(edge => edge.target === node);

    for (const {source} of predecessors) {
        const predecessorTask = scheduledTasks.find(task => task.node === source);
        if (predecessorTask) {
            const commCost = graphData.edges.find(edge => edge.source === source && edge.target === node)?.cost || 0;
            if (predecessorTask.processor === processor) {
                maxPredecessorEndTime = Math.max(maxPredecessorEndTime, predecessorTask.endTime);
            } else {
                maxPredecessorEndTime = Math.max(maxPredecessorEndTime, predecessorTask.endTime + commCost);
            }
        }
    }

    const latestProcessorTime = currentProcessorTimes[processor] || 0;
    const startTime = Math.max(maxPredecessorEndTime, latestProcessorTime);

    return startTime;
};

const GuessNextStepPage = () => {
    const nodeIds = graphData.nodes.map(node => node.id);
    const numProcessors = graphData.num_processors || 4;
    const processors = Array.from({length: numProcessors}, (_, i) => `P${i + 1}`);
    const nodePredecessors = nodeIds.reduce((acc, nodeId) => {
        acc[nodeId] = graphData.edges.filter(edge => edge.target === nodeId).map(edge => edge.source);
        return acc;
    }, {});

    const [assignments, setAssignments] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [hlfetSteps, setHlfetSteps] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [currentProcessorTimes, setCurrentProcessorTimes] = useState(processors.reduce((acc, processor) => ({
        ...acc,
        [processor]: 0
    }), {}));
    const [feedback, setFeedback] = useState(null);
    const [previousAssignments, setPreviousAssignments] = useState([]);

    useEffect(() => {
        const fetchSteps = async () => {
            try {
                const steps = await fetchHLFETSteps();
                setHlfetSteps(steps);
            } catch (error) {
                console.error('Error fetching HLFET steps:', error);
            }
        };

        fetchSteps();
    }, []);

    const handleAssignment = useCallback((newAssignmentsDict) => {
        const newAssignmentsArray = Object.entries(newAssignmentsDict);
        let newAssignmentIndex = -1;

        for (let i = 0; i < newAssignmentsArray.length; i++) {
            const [node, processor] = newAssignmentsArray[i];
            if (!previousAssignments.some(prev => prev.node === node && prev.processor === processor)) {
                newAssignmentIndex = i;
                break;
            }
        }

        if (newAssignmentIndex === -1) {
            console.log('No new assignment found.');
            return;
        }

        const [node, processor] = newAssignmentsArray[newAssignmentIndex];

        const correctStep = hlfetSteps[currentStep];
        const correctProcessor = correctStep.details.processor.toString();
        let trimmedProcessor = processor;
        if (processor.startsWith('P')) {
            trimmedProcessor = processor.slice(1);
        }

        if (correctStep.details.node === node && correctProcessor === trimmedProcessor) {
            setAssignments((prevAssignments) => ({
                ...prevAssignments,
                [node]: processor
            }));

            const startTime = calculateAssignmentTime(node, processor, assignments, scheduledTasks, currentProcessorTimes);
            const nodeWeight = graphData.nodes.find(n => n.id === node).weight;
            const endTime = startTime + nodeWeight;

            setScheduledTasks((prevScheduledTasks) => [
                ...prevScheduledTasks,
                {node, processor, startTime, endTime}
            ]);

            setCurrentProcessorTimes((prevProcessorTimes) => ({
                ...prevProcessorTimes,
                [processor]: endTime
            }));

            setFeedback('Correct! Proceeding to the next step.');

            if (currentStep < hlfetSteps.length - 1) {
                setCurrentStep((prevStep) => prevStep + 1);
            } else {
                setFeedback('Congratulations! You have completed all steps.');
            }
        } else {
            setFeedback(`Incorrect. The correct assignment was Node ${correctStep.details.node} to Processor ${correctProcessor}. Try again.`);
        }

        setPreviousAssignments(prevAssignments => [...prevAssignments, {node, processor}]);
    }, [currentStep, hlfetSteps, assignments, scheduledTasks, currentProcessorTimes, previousAssignments]);

    const resetState = () => {
        setAssignments({});
        setCurrentStep(0);
        fetchHLFETSteps();
        setScheduledTasks([]);
        setCurrentProcessorTimes(processors.reduce((acc, processor) => ({...acc, [processor]: 0}), {}));
        setFeedback(null);
        setPreviousAssignments([]);
    };

    return (
        <div className="mb-4">
            <h1>Guess the Next Step</h1>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                        <GraphComponent key="graph" graphData={graphData}/>
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={processors}
                            nodePredecessors={nodePredecessors}
                            assignments={assignments}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                            onRefresh={resetState}
                        />
                        {feedback && (
                            <div className="feedback mt-3">
                                <p>{feedback}</p>
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="assignment-container">
                            <h3>Assignment Details</h3>
                            <ul>
                                {scheduledTasks.map((task, index) => (
                                    <li key={index}>
                                        Node {task.node} assigned to Processor {task.processor}
                                        (Start time: {task.startTime}, End time: {task.endTime})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuessNextStepPage;
