import React from 'react';
import { Table } from 'react-bootstrap';

const AssignmentDetails = ({ assignments, scheduledTasks, maxTime, finished }) => {
    return (
        <div className="assignment-container">
            <h3>Assignment Details</h3>
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
                {Object.entries(assignments).map(([node, processor], index) => {
                    const task = scheduledTasks.find(task => task.node === node);
                    return (
                        <tr key={index}>
                            <td>{node}</td>
                            <td>{processor}</td>
                            <td>{task ? task.startTime : '-'}</td>
                            <td>{task ? task.endTime : '-'}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            {finished && <p>Total time: {maxTime} units of time.</p>}
        </div>
    );
};

export default AssignmentDetails;
