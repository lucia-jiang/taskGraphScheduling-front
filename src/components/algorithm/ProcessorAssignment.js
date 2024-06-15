// src/components/ProcessorAssignment.js
import React from 'react';

const ProcessorAssignment = ({assignments}) => {
    return (
        <div className="rounded-square">
            <div className="rounded-subsection">
                <h4>Processor Assignment</h4>
                <div dangerouslySetInnerHTML={{__html: assignments.replace(/\n/g, '<br />')}}/>
            </div>
        </div>);
};

export default ProcessorAssignment;
