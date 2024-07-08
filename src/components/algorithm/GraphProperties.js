import React, {useState, useEffect} from 'react';
import {Table, Accordion, Card} from 'react-bootstrap';
import axios from 'axios';
import GraphPropertiesStepList from "./GraphPropertiesStepList";

const GraphProperties = ({graphData, prop}) => {
    const [properties, setProperties] = useState({});
    const [sortConfig, setSortConfig] = useState({key: 'SL', direction: 'ascending'});
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const fetchGraphProperties = async () => {
            try {
                const response = await axios.post('http://localhost:8000/graph/properties/', graphData, {
                    headers: {'Content-Type': 'application/json'}
                });
                if (prop === "SL") {
                    const steps = await axios.post('http://localhost:8000/graph/properties/sl', graphData, {
                        headers: {'Content-Type': 'application/json'}
                    });
                    setSteps(steps.data);
                } else {
                    const steps = await axios.post('http://localhost:8000/graph/properties/lst', graphData, {
                        headers: {'Content-Type': 'application/json'}
                    });
                    setSteps(steps.data);
                }
                setProperties(response.data);

            } catch (error) {
                console.error('Error fetching graph properties:', error);
            }
        };

        fetchGraphProperties();
    }, []);

    // Check if properties is empty or undefined
    if (!properties || Object.keys(properties).length === 0) {
        return (
            <div className="rounded-square">
                <h3>Graph Properties</h3>
                <p>No data available</p>
            </div>
        );
    }

    const nodeIds = Object.keys(properties[prop] || {});

    const sortedData = nodeIds.map(nodeId => ({
        nodeId,
        ...Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, value[nodeId]]))
    }));

    if (sortConfig.key && properties[prop]) {
        sortedData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    };

    return (
        <div>
            <Accordion className="mb-3 custom-accordion">
                <Accordion.Item>
                    <Accordion.Header>
                        <h4>Graph Properties</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered hover responsive className="border">
                            <thead>
                            <tr>
                                <th onClick={() => requestSort('nodeId')}>Node ID {getSortIndicator('nodeId')}</th>
                                {prop === 'SL' &&
                                    <th onClick={() => requestSort('SL')}>SL {getSortIndicator('SL')}</th>}
                                {prop === 'LST' && (
                                    <>
                                        <th onClick={() => requestSort('EST')}>EST {getSortIndicator('EST')}</th>
                                        <th onClick={() => requestSort('LST')}>LST {getSortIndicator('LST')}</th>
                                    </>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {sortedData.map(({nodeId, SL, EST, LST}) => (
                                <tr key={nodeId}>
                                    <td>{nodeId}</td>
                                    {prop === 'SL' && <td>{SL}</td>}
                                    {prop === 'LST' && (
                                        <>
                                            <td>{EST}</td>
                                            <td>{LST}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Accordion>
                            <Card>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Steps</Accordion.Header>
                                    <Accordion.Body>
                                        <GraphPropertiesStepList steps={steps} prop={prop}/>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Card>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default GraphProperties;
