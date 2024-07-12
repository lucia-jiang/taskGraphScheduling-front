import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";

const HLFETAlgorithm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const graphDataStr = query.get('graphData');
    const initialGraphData = location.state?.graphData || (graphDataStr ? JSON.parse(decodeURIComponent(graphDataStr)) : generateRandomGraph());

    const pseudocodeSteps = `
        <strong>Step 1:</strong> 
        Calculate Static Level (SL) for each task.
        <ul>
            <li>For each task (node), if it hasn't been calculated:</li>
            <ul>
                <li>If it has no successors, SL = execution time of the task.</li>
                <li>Otherwise, SL = execution time + maximum SL of its successors.</li>
            </ul>
        </ul>
        
        <strong>Step 2:</strong> 
        List all tasks and sort them by SL in descending order.
        <br />
        
        <strong>Step 3:</strong> 
        Schedule tasks:
        <ul>
            <li>While there are tasks to schedule:</li>
            <ul>
                <li>Take the task with the highest SL.</li>
                <li>Determine the earliest start time on available processors.</li>
                <ul>
                    <li>If the task's processor is the same as the previous task's processor:
                        Earliest start time = end time of the previous task. </li>
                    <li>Otherwise:
                        Earliest start time = end time of the previous task + communication time (cost of the edge).</li>
                </ul>
                <li>Assign the task to the processor that allows the earliest start.</li>
            </ul>
        </ul>
    `;

    const [stepsList, setStepsList] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [graphData, setGraphData] = useState(initialGraphData);

    console.log(graphData)

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setStepsList(response.data);
            } catch (error) {
                console.error('Error fetching stepsList:', error);
            }
        };

        fetchStepsList();
    }, [graphData]);

    const handleUpdateAssignments = useCallback((updatedAssignments) => {
        setScheduledTasks(updatedAssignments);
    }, []);

    return (
        <div>
            <h1>Highest Level First with Estimated Time (HLFET) Algorithm</h1>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Pseudocode steps={pseudocodeSteps} />
                        <ProcessorAssignment assignments={scheduledTasks} />
                    </div>
                    <div className="col-12 col-md-4">
                        <MemoizedGraphComponent graphData={graphData} />
                    </div>
                    <div className="col-12 col-md-4">
                        <GraphProperties graphData={graphData} prop="SL" />
                        <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Memoized GraphComponent
const MemoizedGraphComponent = memo(GraphComponent);

export default HLFETAlgorithm;
