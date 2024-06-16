import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const StepsList = ({ steps, onUpdateAssignments }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        if (steps[currentStepIndex]) {
            onUpdateAssignments(steps.slice(0, currentStepIndex + 1));
        }
    }, [currentStepIndex, steps, onUpdateAssignments]);

    const handlePreviousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const handleNextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const currentStep = steps[currentStepIndex];

    return (
        <div className="rounded-square">
            <h3>Steps</h3>
            <div>
                {currentStep && (
                    <div className="step-item">
                        <p>
                            <strong>Step {currentStepIndex + 1}: </strong>
                            {currentStep.desc}. <br/>
                            Processor {currentStep.processor} to Node {currentStep.node} in {currentStep.time} units of time.
                        </p>
                    </div>
                )}
            </div>
            <div className="step-buttons mt-3">
                <Button
                    className={'mr-4'}
                    variant="primary"
                    onClick={handlePreviousStep}
                    disabled={currentStepIndex === 0}
                >
                    Previous Step
                </Button>
                <Button
                    variant="primary"
                    onClick={handleNextStep}
                    disabled={currentStepIndex >= steps.length - 1}
                >
                    Next Step
                </Button>
            </div>
        </div>
    );
};

export default StepsList;
