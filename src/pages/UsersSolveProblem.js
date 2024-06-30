import React, { useState, useEffect } from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';
import axios from 'axios';

// Import the JSON data
// import graphData from '../graph-examples-json/graph-1.json';
import graphData from '../graph-examples-json/graph-2.json';
// import graphData from '../graph-examples-json/graph-3.json';
// import graphData from '../graph-examples-json/graph-4.json';

const fetchAlgorithmResults = async () => {
    const hlfet = await axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    const mcp = await axios.post('http://localhost:8000/algorithm/mcp-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    const etf = await axios.post('http://localhost:8000/algorithm/etf-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    return {
        algorithm1: { time: (hlfet.data[hlfet.data.length-1])["details"]["total_time"] },
        algorithm2: { time: (mcp.data[mcp.data.length-1])["details"]["total_time"] },
        algorithm3: { time: (etf.data[etf.data.length-1])["details"]["total_time"] }
    };
};

const calculateAssignmentTime = (node, processor, assignments, scheduledTasks, currentProcessorTimes) => {
    let startTime = 0;
    const predecessors = graphData.edges.filter(edge => edge.target === node);

    for (const { source } of predecessors) {
        const predecessorTask = scheduledTasks.find(task => task.node === source);
        if (predecessorTask) {
            if (predecessorTask.processor === processor) {
                startTime = Math.max(startTime, predecessorTask.endTime);
            } else {
                const commCost = graphData.edges.find(edge => edge.source === source && edge.target === node).cost;
                startTime = Math.max(startTime, predecessorTask.endTime + commCost);
            }
        }
    }

    const latestProcessorTime = currentProcessorTimes[processor] || 0;
    return Math.max(startTime, latestProcessorTime);
};

const UsersSolveProblem = () => {
    const [assignments, setAssignments] = useState({});
    const [finished, setFinished] = useState(false);
    const [algorithmResults, setAlgorithmResults] = useState(null);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [currentProcessorTimes, setCurrentProcessorTimes] = useState({});

    const handleAssignment = (newAssignments) => {
        const updatedAssignments = { ...assignments, ...newAssignments };
        const updatedProcessorTimes = { ...currentProcessorTimes };
        const updatedScheduledTasks = [...scheduledTasks];

        for (const [node, processor] of Object.entries(newAssignments)) {
            const startTime = calculateAssignmentTime(node, processor, assignments, scheduledTasks, currentProcessorTimes);
            const nodeWeight = graphData.nodes.find(n => n.id === node).weight;
            const endTime = startTime + nodeWeight;

            updatedScheduledTasks.push({ node, processor, startTime, endTime });
            updatedProcessorTimes[processor] = endTime;
        }

        setAssignments(updatedAssignments);
        setScheduledTasks(updatedScheduledTasks);
        setCurrentProcessorTimes(updatedProcessorTimes);
        setFinished(false);
    };

    const handleFinished = async () => {
        try {
            const results = await fetchAlgorithmResults();
            setAlgorithmResults(results);
            setFinished(true);
        } catch (error) {
            console.error('Error fetching algorithm results:', error);
        }
    };

    const nodeIds = graphData.nodes.map(node => node.id);
    const numProcessors = graphData.num_processors || 4;
    const processors = Array.from({ length: numProcessors }, (_, i) => `P${i + 1}`);
    const nodePredecessors = nodeIds.reduce((acc, nodeId) => {
        acc[nodeId] = graphData.edges.filter(edge => edge.target === nodeId).map(edge => edge.source);
        return acc;
    }, {});

    useEffect(() => {
        setCurrentProcessorTimes(processors.reduce((acc, processor) => ({ ...acc, [processor]: 0 }), {}));
    }, []);

    // Calculate user's total end time
    const userEndTime = scheduledTasks.length > 0
        ? Math.max(...scheduledTasks.map(task => task.endTime))
        : 0;


    return (
        <div className={"mb-4"}>
            <h1>Users solve problem</h1>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                        <GraphComponent graphData={graphData} />
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={processors}
                            nodePredecessors={nodePredecessors}
                            assignments={assignments}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                        />
                        {Object.keys(assignments).length === nodeIds.length && !finished && (
                            <button className="btn btn-primary mt-2" onClick={handleFinished}>
                                Finished
                            </button>
                        )}
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="assignment-container">
                            <h3>Assignment Details</h3>
                            <ul>
                                {Object.entries(assignments).map(([node, processor], index) => {
                                    const task = scheduledTasks.find(task => task.node === node);
                                    return (
                                        <li key={index}>
                                            Node {node} assigned to Processor {processor}
                                            {task && (
                                                <span>
                                                    &nbsp;(Start time: {task.startTime}, End time: {task.endTime})
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="results-container">
                            <h3>Results</h3>
                            {finished && algorithmResults && (
                                <ul>
                                    <li>Your time: {userEndTime} units of time.</li>
                                    <li>HLFET algorithm time: {algorithmResults.algorithm1.time} units of time.</li>
                                    <li>MCP algorithm time: {algorithmResults.algorithm2.time} units of time.</li>
                                    <li>ETF algorithm time: {algorithmResults.algorithm3.time} units of time.</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSolveProblem;
