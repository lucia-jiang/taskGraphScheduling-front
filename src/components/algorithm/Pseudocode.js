// src/components/Pseudocode.js
import React from 'react';

const Pseudocode = ({steps}) => {
    return (
        <div className="rounded-square">
            <div className="rounded-subsection">
                <h4>Pseudocode</h4>
                <div dangerouslySetInnerHTML={{__html: steps.replace(/\n/g, '<br />')}}/>
            </div>
        </div>);
};

export default Pseudocode;
