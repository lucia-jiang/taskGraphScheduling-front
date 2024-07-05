import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';
import axios from 'axios';
import graphData from '../graph-examples-json/graph-2.json';

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
        algorithm1: { time: (hlfet.data[hlfet.data.length - 1])["details"]["total_time"] },
        algorithm2: { time: (mcp.data[mcp.data.length - 1])["details"]["total_time"] },
        algorithm3: { time: (etf.data[etf.data.length - 1])["details"]["total_time"] }
    };
};

const calculateAssignmentTime = (node, processor, assignments, scheduledTasks, currentProcessorTimes) => {
    let maxPredecessorEndTime = 0;
    const predecessors = graphData.edges.filter(edge => edge.target === node);

    for (const { source } of predecessors) {
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
    return Math.max(maxPredecessorEndTime, latestProcessorTime);
};

const UsersSolveProblem = () => {
    const nodeIds = graphData.nodes.map(node => node.id);
    const numProcessors = graphData.num_processors || 4;
    const processors = Array.from({ length: numProcessors }, (_, i) => `P${i + 1}`);
    const nodePredecessors = nodeIds.reduce((acc, nodeId) => {
        acc[nodeId] = graphData.edges.filter(edge => edge.target === nodeId).map(edge => edge.source);
        return acc;
    }, {});

    const [assignments, setAssignments] = useState({});
    const [finished, setFinished] = useState(false);
    const [algorithmResults, setAlgorithmResults] = useState(null);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [currentProcessorTimes, setCurrentProcessorTimes] = useState(processors.reduce((acc, processor) => ({ ...acc, [processor]: 0 }), {}));

    const handleAssignment = useCallback((newAssignments) => {
        setAssignments((prevAssignments) => {
            const trulyNewAssignments = Object.entries(newAssignments)
                .filter(([node, processor]) => !prevAssignments[node] || prevAssignments[node] !== processor)
                .reduce((acc, [node, processor]) => {
                    acc[node] = processor;
                    return acc;
                }, {});

            const updatedAssignments = { ...prevAssignments, ...trulyNewAssignments };
            const updatedProcessorTimes = { ...currentProcessorTimes };
            const updatedScheduledTasks = [...scheduledTasks];

            for (const [node, processor] of Object.entries(trulyNewAssignments)) {
                const startTime = calculateAssignmentTime(node, processor, updatedAssignments, updatedScheduledTasks, updatedProcessorTimes);
                const nodeWeight = graphData.nodes.find(n => n.id === node).weight;
                const endTime = startTime + nodeWeight;

                updatedScheduledTasks.push({ node, processor, startTime, endTime });
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
        setCurrentProcessorTimes(processors.reduce((acc, processor) => ({ ...acc, [processor]: 0 }), {}));
    };

    const userEndTime = scheduledTasks.length > 0
        ? Math.max(...scheduledTasks.map(task => task.endTime))
        : 0;

    const graphDataStr = encodeURIComponent(JSON.stringify(graphData));

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
                            onRefresh={resetState} // Pass the resetState function as a prop
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
                                </ul>)}
                            {finished && algorithmResults && (
                            <div className="algorithm-links">
                                <Link to={`/algorithms/hlfet?graphData=${graphDataStr}`} className="btn btn-primary mt-2 mr-2">
                                    View HLFET Steps
                                </Link>
                                <Link to={`/algorithms/mcp?graphData=${graphDataStr}`} className="btn btn-primary mt-2 mr-2">
                                    View MCP Steps
                                </Link>
                                <Link to={`/algorithms/etf?graphData=${graphDataStr}`} className="btn btn-primary mt-2">
                                    View ETF Steps
                                </Link>
                            </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSolveProblem;
