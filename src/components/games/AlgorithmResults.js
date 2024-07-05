import React from 'react';
import { Table, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AlgorithmResults = ({ algorithmResults, graphDataStr }) => {
    return (
        <div className="results-container">
            <h3>Results</h3>
            {algorithmResults && (
                <div>
                    {algorithmResults.algorithm1 && (
                        <Accordion eventKey={0}>
                            <Accordion.Header>
                                HLFET algorithm time: {algorithmResults.algorithm1.time} units of time.
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Node</th>
                                        <th>Processor</th>
                                        <th>Start Time (units)</th>
                                        <th>End Time (units)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {algorithmResults.algorithm1.data.map((step, index) => (
                                        step.details && step.details.candidates && (
                                            <tr key={index}>
                                                <td>{step.details.node}</td>
                                                <td>{step.details.processor}</td>
                                                <td>{step.details.start_time}</td>
                                                <td>{step.details.end_time}</td>
                                            </tr>
                                        )
                                    ))}
                                    </tbody>
                                </Table>
                                <Link to={`/algorithms/hlfet?graphData=${graphDataStr}`} className="btn btn-primary mt-2 mr-2">
                                    View HLFET Steps
                                </Link>
                            </Accordion.Body>
                        </Accordion>
                    )}
                    {algorithmResults.algorithm2 && (
                        <Accordion eventKey={1}>
                            <Accordion.Header>
                                MCP algorithm time: {algorithmResults.algorithm2.time} units of time.
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Node</th>
                                        <th>Processor</th>
                                        <th>Start Time (units)</th>
                                        <th>End Time (units)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {algorithmResults.algorithm2.data.map((step, index) => (
                                        step.details && step.details.candidates && (
                                            <tr key={index}>
                                                <td>{step.details.node}</td>
                                                <td>{step.details.processor}</td>
                                                <td>{step.details.start_time}</td>
                                                <td>{step.details.end_time}</td>
                                            </tr>
                                        )
                                    ))}
                                    </tbody>
                                </Table>
                                <Link to={`/algorithms/mcp?graphData=${graphDataStr}`} className="btn btn-primary mt-2 mr-2">
                                    View MCP Steps
                                </Link>
                            </Accordion.Body>
                        </Accordion>
                    )}
                    {algorithmResults.algorithm3 && (
                        <Accordion eventKey={2}>
                            <Accordion.Header>
                                ETF algorithm time: {algorithmResults.algorithm3.time} units of time.
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Node</th>
                                        <th>Processor</th>
                                        <th>Start Time (units)</th>
                                        <th>End Time (units)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {algorithmResults.algorithm3.data.map((step, index) => (
                                        step.details && step.details.candidates && (
                                            <tr key={index}>
                                                <td>{step.details.node}</td>
                                                <td>{step.details.processor}</td>
                                                <td>{step.details.start_time}</td>
                                                <td>{step.details.end_time}</td>
                                            </tr>
                                        )
                                    ))}
                                    </tbody>
                                </Table>
                                <Link to={`/algorithms/etf?graphData=${graphDataStr}`} className="btn btn-primary mt-2">
                                    View ETF Steps
                                </Link>
                            </Accordion.Body>
                        </Accordion>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlgorithmResults;
