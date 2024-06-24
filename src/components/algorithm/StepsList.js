// StepsList.js

import React, {useEffect, useState, useCallback} from 'react';
import {Button} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const StepsList = ({steps, onUpdateAssignments}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        if (steps[currentStepIndex]) {
            onUpdateAssignments(steps.slice(0, currentStepIndex + 1));
        }
    }, [currentStepIndex, steps, onUpdateAssignments]);

    const handlePreviousStep = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    }, [currentStepIndex]);

    const handleNextStep = useCallback(() => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    }, [currentStepIndex, steps.length]);

    const currentStep = steps[currentStepIndex];

    return (
        <div className="rounded-square">
            <h4>Steps</h4>
            <div>
                {currentStep && (
                    <div className="step-item">
                        <p>
                            <strong>Step {currentStepIndex + 1}: </strong>
                            {currentStep.step} <br/>
                            {currentStep.details.candidates && currentStep.desc}
                        </p>
                        {currentStep.details.candidates && (
                            <div>
                                <Accordion>
                                    <Accordion.Item eventKey={0}>
                                        <Accordion.Header>
                                            Candidates
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {currentStep.details.candidates.map((candidate, idx) => (
                                                <p key={idx}>
                                                    Node {currentStep.details.node} -> Processor {candidate.processor}.
                                                    Time: {candidate.start_time} - {candidate.end_time} units
                                                </p>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        )}
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
