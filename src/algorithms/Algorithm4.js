// src/algorithms/Algorithm4.js
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pseudocode from '../components/algorithm/Pseudocode';
import ProcessorAssignment from '../components/algorithm/ProcessorAssignment';
import GraphComponent from '../components/algorithm/GraphComponent';
import GraphProperties from '../components/algorithm/GraphProperties';
import StepsList from '../components/algorithm/StepsList';

const Algorithm4 = () => {
    const pseudocodeSteps = "Step 1: Do this<br />Step 2: Do that";
    const processorAssignments = "Processor 1 -> Node 3, Time: 5 units<br />Processor 2 -> Node 4, Time: 3 units";
    const graphImage = "Graph Image";
    const graphProperties = "Property 1: Value 1<br />Property 2: Value 2";
    const stepsList = "Step 1: Processor 1 -> Node 3, Time: 5 units<br />Step 2: Processor 2 -> Node 4, Time: 3 units";

    return (
        <div>
            <h1>Algorithm 4 explanation</h1>
            <Container>
                <Row className={"mt-3"}>
                    <Col md={4}>
                        <Pseudocode steps={pseudocodeSteps} />
                        <ProcessorAssignment assignments={processorAssignments} />
                    </Col>
                    <Col md={4}>
                        <GraphComponent image={graphImage} />
                    </Col>
                    <Col md={4}>
                        <GraphProperties properties={graphProperties} />
                        <StepsList steps={stepsList} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Algorithm4;
