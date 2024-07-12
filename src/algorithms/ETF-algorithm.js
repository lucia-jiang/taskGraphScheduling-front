import React, {useState, useEffect, useCallback, memo} from 'react';
import {useLocation} from 'react-router-dom';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";

const ETFAlgorithm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const graphDataStr = query.get('graphData');
    const initialGraphData = location.state?.graphData || (graphDataStr ? JSON.parse(decodeURIComponent(graphDataStr)) : generateRandomGraph());

    const pseudocodeSteps = `
        <strong>Step 1: </strong>
        Calculate Static Level (SL) for each task.
        <ul>
        <li>For each task (node), if it hasn't been calculated:</li>
            <ul>
                <li>If it has no successors, SL = execution time of the task.</li>
                <li>Otherwise, SL = execution time + maximum SL of its successors.</li>
            </ul>
        </ul>
        <strong>Step 2:</strong> 
        Start with only the entry node (root node) in the ready nodes list.<br />
        
        <strong>Step 3:</strong> 
        While the ready list is not empty, do:<br />
        <ul>
            <li> Calculate the earliest possible start time for each node in the ready list on all processors.</li>
            <ul>
                <li>If the task's processor is the same as the previous task's processor:
                    Earliest start time = end time of the previous task. </li>
                <li>Otherwise:
                    Earliest start time = end time of the previous task + communication time (cost of the edge).</li>
            </ul>
            <li> Choose the node-processor pair that allows the earliest start time. If tied, prefer the node with a higher SL.</li>
            <li> Schedule the selected node on the chosen processor.</li>
            <li> Add any newly ready nodes (nodes whose dependencies are satisfied) to the ready list.</li>
        </ul>
    `;

    const [stepsList, setStepsList] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [graphData] = useState(initialGraphData);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('https://task-graph-scheduling-lucia-jiang-2e58e4e5.koyeb.app/algorithm/etf-steps', graphData, {
                    headers: {'Content-Type': 'application/json'}
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
        <div className="container-fluid pl-3 pr-3 mt-3">
            <h1>Earliest Time First (ETF) Algorithm</h1>
            <div className="row pt-3">
                <div className="col-12 col-md-4">
                    <Pseudocode steps={pseudocodeSteps}/>
                    <ProcessorAssignment assignments={scheduledTasks}/>
                </div>
                <div className="col-12 col-md-4">
                    <MemoizedGraphComponent graphData={graphData}/>
                </div>
                <div className="col-12 col-md-4">
                    <GraphProperties graphData={graphData} prop={"SL"}/>
                    <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments}/>
                </div>
            </div>
        </div>
    );
};

// Memoized GraphComponent
const MemoizedGraphComponent = memo(GraphComponent);

export default ETFAlgorithm;
