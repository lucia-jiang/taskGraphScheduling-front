// ProcessorAssignment.js

import React from 'react';

const ProcessorAssignment = ({assignments}) => {
    return (
        <div className="rounded-square">
            <div className="rounded-subsection">
                <h4>Processor Assignment</h4>
                {assignments.map((step, index) => (
                    <div key={index}>
                        {step.details.candidates && (
                            <p>
                                <strong>Processor {step.details.processor} -> Node {step.details.node}, </strong>
                                Time: {step.details.start_time} - {step.details.end_time} units,
                                Total time: {step.details.total_time} units
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessorAssignment;
