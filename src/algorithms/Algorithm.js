import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';
import axios from 'axios';

// import graphData from '../graph-examples-json/graph-1.json';

const Algorithm = ({algorithmName, graphData}) => {
    const pseudocodeSteps = 'Step 1: Do this<br />Step 2: Do that';
    const graphProperties = 'Property 1: Value 1<br />Property 2: Value 2';
    const [stepsList, setStepsList] = useState([]);
    const [cumulativeAssignments, setCumulativeAssignments] = useState([]);

    useEffect(() => {
        const fetchStepsList = async () => {
            try {
                const response = await axios.get('http://localhost:8000/steps');
                console.log('Steps List:', response.data);
                setStepsList(response.data);
            } catch (error) {
                console.error('Error fetching stepsList:', error);
            }
        };

        fetchStepsList();
    }, []);

    const handleUpdateAssignments = (updatedAssignments) => {
        setCumulativeAssignments(updatedAssignments);
    };

    console.log("graphData:", graphData); // Check if graphData is correctly imported

    return (
        <div>
            <h1>{algorithmName}</h1>
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Pseudocode steps={pseudocodeSteps} />
                        <ProcessorAssignment assignments={cumulativeAssignments} />
                    </Col>
                    <Col md={4}>
                        <GraphComponent graphData={graphData} />
                    </Col>
                    <Col md={4}>
                        <GraphProperties properties={graphProperties} />
                        <StepsList steps={stepsList} onUpdateAssignments={handleUpdateAssignments} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Algorithm;
