import React from 'react';
import { Table } from 'react-bootstrap';

const ProcessorAssignment = ({ assignments }) => {
    // Compute the maximum end time
    const makespan = Math.max(...assignments.map(step => step.details?.end_time ?? 0));

    return (
        <div className="rounded-square">
            <div className="rounded-subsection">
                <h4>Processor Assignment</h4>
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
                    {assignments.map((step, index) => (
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
                <p>Total time: {makespan} units of time.</p>
            </div>
        </div>
    );
};

export default ProcessorAssignment;
