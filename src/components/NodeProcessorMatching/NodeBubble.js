import React from 'react';
import './NodeProcessorMatching.css';

const NodeBubble = ({ node, onClick, isSelected, isAssigned, isDisabled }) => {
    let className = 'bubble';
    if (isSelected) className += ' selected';
    if (isAssigned) className += ' assigned';
    if (isDisabled) className += ' disabled';

    return (
        <div
            className={className}
            onClick={() => !isDisabled && onClick(node)}
        >
            {node}
        </div>
    );
};

export default NodeBubble;
