// src/components/NodeBubble.js
import React from 'react';
import './NodeProcessorMatching.css';

const NodeBubble = ({ node, onClick, isSelected, isAssigned }) => {
    return (
        <div
            className={`bubble ${isSelected ? 'selected' : ''} ${isAssigned ? 'assigned' : ''}`}
            onClick={onClick}
        >
            {node}
        </div>
    );
};

export default NodeBubble;
