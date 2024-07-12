import React, {useState, useEffect, useCallback, memo} from 'react';
import {useLocation} from 'react-router-dom';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";

const MCPAlgorithm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const graphDataStr = query.get('graphData');
    const initialGraphData = location.state?.graphData || (graphDataStr ? JSON.parse(decodeURIComponent(graphDataStr)) : generateRandomGraph());

    const pseudocodeSteps = `
        <strong>Step 1:</strong> 
        Calculate the Latest Start Time (LST) for each task in the graph.<br />
        <ul>
            <li>If v<sub>i</sub> is an end node, LST(v<sub>i</sub>)=EST(v<sub>i</sub>). To calculate the Earliest Start Time (EST):</li>
            <ul>
                <li>EST(v<sub>i</sub>) = max<sub>v<sub>m</sub> ∈ pred(v<sub>i</sub>)</sub></sub>{EST(v<sub>m</sub>)+w<sub>m</sub>+c<sub>m,i</sub>}</li>
            </ul>
            <li>Otherwise, LST(v<sub>i</sub>) = min<sub>v<sub>m</sub> ∈ succ(v<sub>i</sub>)</sub>{LST(v<sub>m</sub>)-c<sub>i,m</sub>}-w<sub>i</sub></li>
        </ul>
        <strong>Step 2:</strong> 
        For each task, create a list containing its LST and the LST of all its dependent tasks.<br />
        <strong>Step 3:</strong> 
        Sort these lists in ascending order of tasks' LST.<br />
        <strong>Step 4:</strong> 
        Create a task list (L) sorted by ascending LST. Resolve ties using the sorted lists from Step 2.<br />
        <strong>Step 5:</strong> 
        While there are tasks in L:<br />
        <ul>
            <li>Dequeue task v<sub>i</sub> from L.</li>
            <li>Determine the earliest possible start time for v<sub>i</sub> on available processors.</li>
            <ul>
                <li>If the task's processor is the same as the previous task's processor:
                    Earliest start time = end time of the previous task. </li>
                <li>Otherwise:
                    Earliest start time = end time of the previous task + communication time (cost of the edge).</li>
            </ul>
            <li>Assign v<sub>i</sub> to the processor that minimizes its earliest start time.</li>
        </ul>
    `;

    const [stepsList, setStepsList] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [graphData] = useState(initialGraphData);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('https://task-graph-scheduling-lucia-jiang-2e58e4e5.koyeb.app/algorithm/mcp-steps', graphData, {
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
            <h1>Modified Critical Path (MCP) Algorithm</h1>
            <div className="row pt-3">
                <div className="col-12 col-md-4">
                    <Pseudocode steps={pseudocodeSteps}/>
                    <ProcessorAssignment assignments={scheduledTasks}/>
                </div>
                <div className="col-12 col-md-4">
                    <MemoizedGraphComponent graphData={graphData}/>
                </div>
                <div className="col-12 col-md-4">
                    <GraphProperties graphData={graphData} prop={"LST"}/>
                    <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments}/>
                </div>
            </div>
        </div>
    );
};

// Memoized GraphComponent
const MemoizedGraphComponent = memo(GraphComponent);

export default MCPAlgorithm;
