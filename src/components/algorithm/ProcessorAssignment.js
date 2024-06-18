import React from 'react';

const ProcessorAssignment = ({assignments}) => {
    return (
        <div className="rounded-square">
            <div className="rounded-subsection">
                <h4>Processor Assignment</h4>
                {assignments.map((assignment, index) => (
                    <div key={index}>
                        <p>
                            <strong>Step {index + 1}:</strong> Processor {assignment.processor} ->
                            Node {assignment.node}, Time: {assignment.time} units, Total time: {assignment.total} units
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessorAssignment;
