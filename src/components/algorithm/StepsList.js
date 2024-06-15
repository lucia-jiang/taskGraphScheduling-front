import React from 'react';
import { Button } from 'react-bootstrap';

const StepsList = ({ steps }) => {
    // Ensure steps is always an array
    const stepsArray = Array.isArray(steps) ? steps : [];

    return (
        <div className="rounded-square">
            <h3>Steps</h3>
            <div>
                {stepsArray.map((step, index) => (
                    <div key={index} className="step-item">
                        <p>
                            <strong>Step {index + 1}:</strong> Processor {step.processor} to Node {step.node} in {step.time} units of time.
                        </p>
                    </div>
                ))}
            </div>
            <div className="step-buttons mt-3">
                <Button className={'mr-4'} variant="primary">Previous Step</Button>
                <Button variant="primary">Next Step</Button>
            </div>
        </div>
    );
};

export default StepsList;
