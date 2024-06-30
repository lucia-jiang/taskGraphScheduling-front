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
                                                <div key={idx}>
                                                    <p>
                                                        <strong>
                                                            Node {currentStep.details.node} ->
                                                            Processor {candidate.processor}.
                                                            Time: {candidate.start_time} - {candidate.end_time} units
                                                        </strong>
                                                    </p>
                                                    <div>
                                                        {(candidate["predecessor_details"]).length > 0 && (
                                                            <div>
                                                                Earliest execution time calculated based on its predecessors:
                                                            <ul>
                                                                {candidate.predecessor_details.map((pred, predIdx) => (
                                                                    <li key={predIdx}>
                                                                        <strong>Node {pred.predecessor} (P{pred.processor}): </strong>

                                                                        {pred.same_processor ?
                                                                        `Same processor, no communication cost. 
                                                                        The earliest start time is the maximum of predecessor end time, and
                                                                        the ending time of the processor: 
                                                                        Start time: max(${pred.pred_end_time}, ${pred.available_time}) = 
                                                                         ${pred.max_start_time} units`:

                                                                        `Different processors. 
                                                                        The earliest start time is the maximum of predecessor end time + communication cost, and
                                                                        the ending time of the processor: 
                                                                        max(${pred.pred_end_time}+${pred.comm_cost}, ${pred.available_time}) = ${pred.max_start_time} units.`}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
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
