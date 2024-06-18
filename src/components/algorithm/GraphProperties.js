import React, {useState, useEffect} from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const GraphProperties = ({graphData}) => {
    const [properties, setProperties] = useState({});

    useEffect(() => {
        const transformToJson = async () => {
            try {
                const response = await axios.post('http://localhost:8000/graph/properties', graphData, {
                    headers: {'Content-Type': 'application/json'}
                });
                console.log("Response graph properties: ", response.data);
                setProperties(response.data); // Update state with response data
            } catch (error) {
                console.error('Error making request:', error);
            }
        };

        transformToJson(); // Call transformToJson on component mount
    }, [graphData]); // Include graphData in dependency array to watch for changes

    // Check if properties is empty or undefined
    if (!properties || Object.keys(properties).length === 0) {
        return (
            <div className="rounded-square">
                <h3>Graph Properties</h3>
                <p>No data available</p>
            </div>
        );
    }

    const propertyNames = Object.keys(properties);
    const nodeIds = Object.keys(properties[propertyNames[0]]);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="rounded-square">
                        <h3>Graph Properties</h3>
                        <Table striped bordered hover responsive className="border">
                            <thead>
                            <tr>
                                <th>Node ID</th>
                                {propertyNames.map((property) => (
                                    <th key={property}>{property}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {nodeIds.map((nodeId) => (
                                <tr key={nodeId}>
                                    <td>{nodeId}</td>
                                    {propertyNames.map((property) => (
                                        <td key={`${nodeId}-${property}`}>
                                            {properties[property][nodeId]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default GraphProperties;
