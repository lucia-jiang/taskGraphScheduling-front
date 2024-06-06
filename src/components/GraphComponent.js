// src/components/GraphComponent.js
import React from 'react';

const GraphComponent = ({ image }) => {
    return (
        <div className="rounded-square graph-placeholder">
            <h3>Graph</h3>
            <div dangerouslySetInnerHTML={{ __html: image.replace(/\n/g, '<br />') }} />
        </div>
    );
};

export default GraphComponent;
