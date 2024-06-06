// src/components/StepsList.js
import React from 'react';
import { Button } from 'react-bootstrap';

const StepsList = ({ steps }) => {
    return (
        <div className="rounded-square">
            <h3>Steps</h3>
            <div dangerouslySetInnerHTML={{ __html: steps.replace(/\n/g, '<br />') }} />
            <div className="step-buttons mt-3">
                <Button className={'mr-4'} variant="primary">Previous Step</Button>
                <Button variant="primary">Next Step</Button>
            </div>
        </div>
    );
};

export default StepsList;
