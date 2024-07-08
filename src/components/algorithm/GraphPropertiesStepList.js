import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

const GraphPropertiesStepList = ({steps, prop}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

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

    return (
        <div>
            {steps.length > 0 ? (
                <div>
                    <p>
                        <strong>Step {currentStepIndex + 1}: </strong>
                        {steps[currentStepIndex].step}
                    </p>
                    <p>{steps[currentStepIndex].desc}</p>
                    {prop === "SL" && <p> SL = {steps[currentStepIndex].details.sl}.</p>}
                    {prop === "LST" && steps[currentStepIndex].details.hasOwnProperty("EST") &&
                        <p> EST = {steps[currentStepIndex].details.EST}.</p>}
                    {prop === "LST" && steps[currentStepIndex].details.hasOwnProperty("LST") && (
                        <p> LST = {steps[currentStepIndex].details.LST}.</p>
                    )}


                </div>
            ) : (
                <p>No steps available</p>
            )}
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

export default GraphPropertiesStepList;
