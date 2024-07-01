import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';

// Import graph data from JSON file
// import defaultGraphData from '../graph-examples-json/graph-1.json';
// import defaultGraphData from '../graph-examples-json/graph-2.json';
import defaultGraphData from '../graph-examples-json/graph-3.json';
// import defaultGraphData from '../graph-examples-json/graph-4.json';

const ETFAlgorithm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const graphDataStr = query.get('graphData');
    const graphData = graphDataStr ? JSON.parse(decodeURIComponent(graphDataStr)) : defaultGraphData;


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

// Now you can use pseudocodeSteps in your React component or application

    const [stepsList, setStepsList] = useState([]);
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('http://localhost:8000/algorithm/etf-steps', graphData, {
                    headers: { 'Content-Type': 'application/json' }
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
            <h1>Earliest Time First (ETF) Algorithm</h1>
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

export default ETFAlgorithm;
