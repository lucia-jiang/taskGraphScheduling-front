import React, {useState, useEffect, useCallback} from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import axios from 'axios';
import graphData from '../graph-examples-json/graph-2.json';
import {useLocation} from 'react-router-dom';
import AssignmentDetails from '../components/games/AssignmentDetails'; // Import AssignmentDetails component

const fetchHLFETSteps = async (algorithmName) => {
    try {
        const response = await axios.post(`http://localhost:8000/algorithm/${algorithmName}-steps`, graphData, {
            headers: {'Content-Type': 'application/json'}
        });

        return response.data.filter(step => step.details && step.details.processor);
    } catch (error) {
        console.error(`Error fetching ${algorithmName} steps:`, error);
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

    return Math.max(maxPredecessorEndTime, latestProcessorTime);
};

const GuessNextStepPage = () => {
    const {state} = useLocation();
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
            if (!state || !state.algorithmName) return;

            const {algorithmName} = state;
            try {
                const steps = await fetchHLFETSteps(algorithmName);
                setHlfetSteps(steps);
            } catch (error) {
                console.error(`Error fetching ${algorithmName} steps:`, error);
            }
        };

        fetchSteps();
    }, [state]);

    const handleAssignment = useCallback((newAssignmentsDict) => {
        const newAssignmentsArray = Object.entries(newAssignmentsDict);
        let newAssignmentFound = false;
        let newAssignmentNode = null;
        let newAssignmentProcessor = null;

        for (let i = 0; i < newAssignmentsArray.length; i++) {
            const [node, processor] = newAssignmentsArray[i];
            if (!previousAssignments.some(prev => prev.node === node && prev.processor === processor)) {
                newAssignmentFound = true;
                newAssignmentNode = node;
                newAssignmentProcessor = processor;
                break;
            }
        }

        if (!newAssignmentFound) {
            console.log('No new assignment found.');
            return;
        }

        const correctStep = hlfetSteps[currentStep];
        const correctProcessor = correctStep.details.processor.toString();
        let trimmedProcessor = newAssignmentProcessor;
        if (newAssignmentProcessor.startsWith('P')) {
            trimmedProcessor = newAssignmentProcessor.slice(1);
        }

        if (correctStep.details.node === newAssignmentNode && correctProcessor === trimmedProcessor) {
            setAssignments((prevAssignments) => ({
                ...prevAssignments,
                [newAssignmentNode]: newAssignmentProcessor
            }));

            const startTime = calculateAssignmentTime(newAssignmentNode, newAssignmentProcessor, assignments, scheduledTasks, currentProcessorTimes);
            const nodeWeight = graphData.nodes.find(n => n.id === newAssignmentNode).weight;
            const endTime = startTime + nodeWeight;

            setScheduledTasks((prevScheduledTasks) => [
                ...prevScheduledTasks,
                {node: newAssignmentNode, processor: newAssignmentProcessor, startTime, endTime}
            ]);

            setCurrentProcessorTimes((prevProcessorTimes) => ({
                ...prevProcessorTimes,
                [newAssignmentProcessor]: endTime
            }));

            setPreviousAssignments(prevAssignments => [...prevAssignments, {
                node: newAssignmentNode,
                processor: newAssignmentProcessor
            }]);

            setFeedback('Correct! Proceeding to the next step.');

            if (currentStep < hlfetSteps.length - 1) {
                setCurrentStep((prevStep) => prevStep + 1);
            } else {
                setFeedback('Congratulations! You have completed all steps.');
            }
        } else {
            setFeedback(`Incorrect. The correct assignment was Node ${correctStep.details.node} to Processor ${correctProcessor}. Try again.`);
        }

    }, [currentStep, hlfetSteps, assignments, scheduledTasks, currentProcessorTimes, previousAssignments]);


    const resetState = () => {
        setAssignments({});
        setCurrentStep(0);
        fetchHLFETSteps(state.algorithmName);
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
                        <AssignmentDetails assignments={assignments} scheduledTasks={scheduledTasks}
                                           maxTime={currentProcessorTimes[processors[0]]}
                                           finished={currentStep === hlfetSteps.length}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuessNextStepPage;
