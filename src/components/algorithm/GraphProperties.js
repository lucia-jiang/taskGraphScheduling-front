// src/components/GraphProperties.js
import React from 'react';

const GraphProperties = ({properties}) => {
    return (
        <div className="rounded-square">
            <h3>Graph Properties</h3>
            <div dangerouslySetInnerHTML={{__html: properties.replace(/\n/g, '<br />')}}/>
        </div>);
};

export default GraphProperties;
