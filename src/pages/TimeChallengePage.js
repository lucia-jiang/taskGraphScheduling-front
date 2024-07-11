import React, { memo, useEffect, useState, useCallback } from 'react';
import GraphComponent from '../components/algorithm/GraphComponent';
import NodeProcessorMatching from '../components/NodeProcessorMatching/NodeProcessorMatching';
import GameLostModal from '../modals/GameLostModal';
import AssignmentDetails from "../components/games/AssignmentDetails";
import AlgorithmResults from '../components/games/AlgorithmResults';
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";
import { calculateAssignmentTime, fetchAlgorithmResults } from "./commonFunctions";

const TimeChallengePage = () => {
    const [graphData, setGraphData] = useState(generateRandomGraph());
    const [assignments, setAssignments] = useState({});
    const [finished, setFinished] = useState(false);
    const [algorithmResults, setAlgorithmResults] = useState(null);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [currentProcessorTimes, setCurrentProcessorTimes] = useState({});

    const gameDuration = 3 //TODO: seconds
    const [timeRemaining, setTimeRemaining] = useState(gameDuration);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [showTimeUpModal, setShowTimeUpModal] = useState(false);
    const [showResults, setShowResults] = useState(false); // State to manage showing detailed results
    const [thresholdTime] = useState(10);
    const [nodeIds, setNodeIds] = useState([]);
    const [processors, setProcessors] = useState([]);
    const [nodePredecessors, setNodePredecessors] = useState({});


    // Update nodeIds, processors, and nodePredecessors when graphData changes
    useEffect(() => {
        if (graphData) {
            const ids = graphData.nodes.map(node => node.id);
            const numProcessors = graphData.num_processors || 4;
            const processors = Array.from({ length: numProcessors }, (_, i) => `P${i + 1}`);
            const predecessors = ids.reduce((acc, nodeId) => {
                acc[nodeId] = graphData.edges.filter(edge => edge.target === nodeId).map(edge => edge.source) || [];
                return acc;
            }, {});

            setNodeIds(ids);
            setProcessors(processors);
            setNodePredecessors(predecessors);
        }
    }, [graphData]);

    // Fetch algorithm results when graphData changes
    useEffect(() => {
        if (graphData) {
            const fetchResults = async () => {
                try {
                    const results = await fetchAlgorithmResults(graphData);
                    setAlgorithmResults(results);
                } catch (error) {
                    console.error('Error fetching algorithm results:', error);
                }
            };

            fetchResults();
        }
    }, [graphData]);

    // Timer effect
    useEffect(() => {
        if (timeRemaining > 0 && !finished) {
            const timerId = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsTimeUp(true);
            if (!finished) {
                setShowTimeUpModal(true);
            }
        }
    }, [timeRemaining, finished]);

    // Handle node assignment
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
                const startTime = calculateAssignmentTime(node, processor, updatedAssignments, updatedScheduledTasks, updatedProcessorTimes, graphData);
                const nodeWeight = graphData.nodes.find(n => n.id === node).weight;
                const endTime = startTime + nodeWeight;

                updatedScheduledTasks.push({ node, processor, startTime, endTime });
                updatedProcessorTimes[processor] = endTime;
            }

            setScheduledTasks(updatedScheduledTasks);
            setCurrentProcessorTimes(updatedProcessorTimes);

            if (Object.keys(updatedAssignments).length === nodeIds.length) {
                setFinished(true);
                setShowTimeUpModal(true); // Ensure modal is hidden if finished
            }

            return updatedAssignments;
        });
    }, [currentProcessorTimes, scheduledTasks, nodeIds, graphData]);

    // Reset game state
    const resetState = () => {
        setAssignments({});
        setFinished(false);
        setScheduledTasks([]);
        setCurrentProcessorTimes({});
        setIsTimeUp(false);
        setShowTimeUpModal(false);
        setShowResults(false); // Reset showing detailed results state
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowTimeUpModal(false);
    };

    // Retry with the same graph
    const handleRetrySameGraph = () => {
        resetState();
        setTimeRemaining(gameDuration);
    };

    // Try with a new randomly generated graph
    const handleTryNewGraph = () => {
        resetState();
        setTimeRemaining(gameDuration)
        setGraphData(generateRandomGraph());
    };

    // Toggle showing detailed results
    const handleShowResults = () => {
        setShowResults(true);
    };

    // Calculate the maximum end time of scheduled tasks
    const userEndTime = scheduledTasks.length > 0 ? Math.max(...scheduledTasks.map(task => task.endTime)) : 0;
    const graphDataStr = graphData ? encodeURIComponent(JSON.stringify(graphData)) : '';

    return (
        <div className="mb-4">
            <h1>Time Challenge Page</h1>
            {algorithmResults && (
                <p>Can you solve the problem under {algorithmResults.minTime} units of time?</p>
            )}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                        <MemoizedGraphComponent graphData={graphData} />
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={processors}
                            nodePredecessors={nodePredecessors}
                            assignments={assignments}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                            isDisabled={isTimeUp || finished}
                            onRefresh={resetState}
                        />
                        {!finished && (
                            <div className="timer mt-3">
                                <h3>Time Remaining: {timeRemaining} seconds</h3>
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-5">
                        <AssignmentDetails assignments={assignments} scheduledTasks={scheduledTasks} maxTime={userEndTime} finished={finished} />
                        {(showResults || finished) && <AlgorithmResults algorithmResults={algorithmResults} graphDataStr={graphDataStr} />}
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
                    onShowResults={handleShowResults} // Define the function to show detailed results
                />
            )}
        </div>
    );
};

// Memoized GraphComponent
const MemoizedGraphComponent = memo(GraphComponent);

export default TimeChallengePage;
