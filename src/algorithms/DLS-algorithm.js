import React, { useState, useEffect, useCallback } from 'react';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';

// Import graph data from JSON file
import defaultGraphData from '../graph-examples-json/graph-1.json';
import {useLocation} from "react-router-dom";
// import defaultGraphData from '../graph-examples-json/graph-2.json';
// import defaultGraphData from '../graph-examples-json/graph-3.json';
// import defaultGraphData from '../graph-examples-json/graph-4.json';

const DLSAlgorithm = () => {
    const location = useLocation();
    const graphData = location.state?.graphData || defaultGraphData;


    const pseudocodeSteps = `
    <strong>Step 1:</strong> 
    Compute the SL (static level) for each node in the graph.<br />
    <strong>Step 2:</strong> 
    Initially, the ready nodes list includes only the entry node. <br/>
    <strong>Step 3:</strong> 
    While the ready list is not empty, do:<br />
    <ul>
        <li> Compute the earliest execution start time on each processor for every node in the ready list.</li>
        <ul>
            <li>If the task's processor is the same as the previous task's processor:
                Earliest start time = end time of the previous task. </li>
            <li>Otherwise:
                Earliest start time = end time of the previous task + communication time (cost of the edge).</li>
        </ul>
        <li> Compute the Dynamic Level (DL) of every node-processor pair by subtracting the earliest execution start time from the node's static level (SL).</li>
        <li> Select the node-processor pair that gives the largest DL.</li>
        <li> Schedule the node to the corresponding selected processor.</li>
        <li> Add the newly ready nodes to the ready list.</li>
    </ul>
`;

    const [stepsList, setStepsList] = useState([]);
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('http://localhost:8000/algorithm/dls-steps', graphData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setStepsList(response.data);
                console.log("Fetched stepsList:", response.data);
            } catch (error) {
                console.error('Error fetching stepsList:', error);
            }
        };

        fetchStepsList();
        console.log("Component mounted");
    }, []); // Empty dependency array ensures this effect runs only once

    const handleUpdateAssignments = useCallback((updatedAssignments) => {
        setCumulativeAssignments(updatedAssignments);
    }, []);

    return (
        <div>
            <h1>Dynamic Level Scheduling (DLS) Algorithm</h1>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Pseudocode steps={pseudocodeSteps} />
                        <ProcessorAssignment assignments={cumulativeAssignments} />
                    </div>
                    <div className="col-12 col-md-4">
                        <GraphComponent graphData={graphData} />
                    </div>
                    <div className="col-12 col-md-4">
                        <GraphProperties graphData={graphData} />
                        <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DLSAlgorithm;
