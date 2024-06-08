// src/components/GraphComponent.js
import React from 'react';

const GraphComponent = ({ imageSrc }) => {
    return (
        <div className="rounded-square graph-placeholder">
            <h3>Graph</h3>
            <img src={imageSrc} alt="Graph" className="img-fluid" />
        </div>
    );
};

export default GraphComponent;
