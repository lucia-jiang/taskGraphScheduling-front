import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GraphComponent from '../components/algorithm/GraphComponent';
import NodeProcessorMatching from '../components/NodeProcessorMatching/NodeProcessorMatching';
import axios from 'axios';
import GameLostModal from '../modals/GameLostModal';
import graphData from '../graph-examples-json/graph-2.json'; // Example graph data

const fetchAlgorithmResults = async () => {
    try {
        const [hlfet, mcp, etf] = await Promise.all([
            axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, { headers: { 'Content-Type': 'application/json' } }),
            axios.post('http://localhost:8000/algorithm/mcp-steps', graphData, { headers: { 'Content-Type': 'application/json' } }),
            axios.post('http://localhost:8000/algorithm/etf-steps', graphData, { headers: { 'Content-Type': 'application/json' } })
        ]);

        const algorithm1Time = hlfet.data[hlfet.data.length - 1].details.total_time;
        const algorithm2Time = mcp.data[mcp.data.length - 1].details.total_time;
        const algorithm3Time = etf.data[etf.data.length - 1].details.total_time;

        const minTime = Math.min(algorithm1Time, algorithm2Time, algorithm3Time);

        return {
            algorithm1: { time: algorithm1Time },
            algorithm2: { time: algorithm2Time },
            algorithm3: { time: algorithm3Time },
            minTime: minTime
        };
    } catch (error) {
        console.error('Error fetching algorithm results:', error);
        throw error;
    }
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
    const startTime = Math.max(maxPredecessorEndTime, latestProcessorTime);

    return startTime;
};

const TimeChallengePage = () => {
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

    const gameDuration = 10; // in seconds
    const [timeRemaining, setTimeRemaining] = useState(gameDuration); // Initial time limit in seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [showTimeUpModal, setShowTimeUpModal] = useState(false); // State to control showing the game lost modal
    const [thresholdTime] = useState(10); // Example threshold time (adjust as per your game's requirement)

    useEffect(() => {
        if (timeRemaining > 0 && !finished) {
            const timerId = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsTimeUp(true);
            if (!finished) {
                setShowTimeUpModal(true); // Show the game lost modal only if not finished
            }
        }
    }, [timeRemaining, finished]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const results = await fetchAlgorithmResults();
                setAlgorithmResults(results);
            } catch (error) {
                console.error('Error fetching algorithm results:', error);
            }
        };

        fetchResults();
    }, []);

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

            if (Object.keys(updatedAssignments).length === nodeIds.length) {
                setFinished(true);
                setShowTimeUpModal(false); // Ensure modal is hidden if finished
            }

            return updatedAssignments;
        });
    }, [currentProcessorTimes, scheduledTasks, nodeIds]);

    const handleFinished = async () => {
        try {
            const results = await fetchAlgorithmResults();
            setAlgorithmResults(results);

            const optimalTime = Math.min(
                results.algorithm1.time,
                results.algorithm2.time,
                results.algorithm3.time
            );

            if (userEndTime <= optimalTime + thresholdTime) {
                setShowTimeUpModal(true);
                console.log('Congratulations! You completed the challenge within the optimal time range.');
            } else {
                setShowTimeUpModal(true);
                console.log('You did not meet the optimal time range requirement. Please try again.');
            }
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
        setIsTimeUp(false); // Reset time up state
        setShowTimeUpModal(false); // Hide the game lost modal
    };

    const handleCloseModal = () => {
        setShowTimeUpModal(false); // Hide the game lost modal
    };

    const handleRetrySameGraph = () => {
        resetState();
        setTimeRemaining(gameDuration); // Reset time remaining to initial game duration
    };

    const handleTryNewGraph = () => {
        // TODO: Logic to load a new graph or redirect to a new graph page
        console.log('Trying a new graph...');
    };

    const userEndTime = scheduledTasks.length > 0
        ? Math.max(...scheduledTasks.map(task => task.endTime))
        : 0;

    const graphDataStr = encodeURIComponent(JSON.stringify(graphData));

    return (
        <div className="mb-4">
            <h1>Time Challenge Page</h1>
            {algorithmResults && (
                <p>Can you solve the problem under {algorithmResults.minTime} units of time?</p>
            )}
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
                            isDisabled={isTimeUp || finished} // Disable if time is up or finished
                            onRefresh={resetState} // Pass the resetState function as a prop
                        />
                        {!finished && (
                            <div className="timer mt-3">
                                <h3>Time Remaining: {timeRemaining} seconds</h3>
                            </div>
                        )}
                        {finished && (
                            <button className="btn btn-primary mt-2" onClick={handleFinished}>
                                Finish
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
                                    <li>Best time: {algorithmResults.minTime}</li>
                                </ul>
                            )}
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
            {algorithmResults && (
                <GameLostModal
                    show={showTimeUpModal}
                    isWin={finished && userEndTime <= algorithmResults.minTime + thresholdTime}
                    onRetrySameGraph={handleRetrySameGraph}
                    onTryNewGraph={handleTryNewGraph}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default TimeChallengePage;
