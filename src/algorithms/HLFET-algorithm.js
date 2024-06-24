// src/pages/HLFETAlgorithm.js
import React, {useState, useEffect, useCallback} from 'react';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import './Pseudocode.css'
import axios from 'axios';

// Import graph data from JSON file
import graphData from '../graph-examples-json/graph-1.json';
// import graphData from '../graph-examples-json/graph-2.json';
// import graphData from '../graph-examples-json/graph-3.json';
// import graphData from '../graph-examples-json/graph-4.json';

const HLFETAlgorithm = () => {
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
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, {
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
            <h1>Highest Level First with Estimated Time (HLFET) Algorithm</h1>
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

export default HLFETAlgorithm;
