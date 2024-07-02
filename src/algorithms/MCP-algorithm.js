import React, {useState, useEffect, useCallback} from 'react';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';
import {useLocation} from "react-router-dom";

// Import graph data from JSON file
// import defaultGraphData from '../graph-examples-json/graph-1.json';
import defaultGraphData from '../graph-examples-json/graph-2.json';
// import defaultGraphData from '../graph-examples-json/graph-3.json';
// import defaultGraphData from '../graph-examples-json/graph-4.json';

const MCPAlgorithm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const graphDataStr = query.get('graphData');
    const graphData = location.state?.graphData || (graphDataStr ? JSON.parse(decodeURIComponent(graphDataStr)) : defaultGraphData);

    const pseudocodeSteps = `
        <strong>Step 1:</strong> 
        Calculate the Latest Start Time (LST) for each task in the graph.<br />
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
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('http://localhost:8000/algorithm/mcp-steps', graphData, {
                    headers: {'Content-Type': 'application/json'}
                });
                setStepsList(response.data);
            } catch (error) {
                console.error('Error fetching stepsList:', error);
            }
        };

        fetchStepsList();
    }, []); // Empty dependency array ensures this effect runs only once

    const handleUpdateAssignments = useCallback((updatedAssignments) => {
        setCumulativeAssignments(updatedAssignments);
    }, []);

    return (
        <div>
            <h1>Modified Critical Path (MCP) Algorithm</h1>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Pseudocode steps={pseudocodeSteps}/>
                        <ProcessorAssignment assignments={cumulativeAssignments}/>
                    </div>
                    <div className="col-12 col-md-4">
                        <GraphComponent graphData={graphData}/>
                    </div>
                    <div className="col-12 col-md-4">
                        <GraphProperties graphData={graphData}/>
                        <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCPAlgorithm;
