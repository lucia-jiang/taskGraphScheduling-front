import React, { useState, useEffect, useCallback } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';

// Import graph data from JSON file
// import graphData from '../graph-examples-json/graph-1.json';
// import graphData from '../graph-examples-json/graph-2.json';
// import graphData from '../graph-examples-json/graph-3.json';
import graphData from '../graph-examples-json/graph-4.json';

const Algorithm4 = () => {
    const pseudocodeSteps = 'Step 1: Do this<br />Step 2: Do that';
    const [stepsList, setStepsList] = useState([]);
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.get('http://localhost:8000/steps');
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
            <h1>Algorithm 4</h1>
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

export default Algorithm4;
