import React from 'react';
import './NodeProcessorMatching.css';

const ProcessorList = ({processors, onSelect}) => {
    return (
        <ul className="processor-list">
            {processors.map((processor, index) => (
                <li
                    key={index}
                    className="processor-list-item"
                    onClick={() => onSelect(processor)}
                >
                    {processor}
                </li>
            ))}
        </ul>
    );
};

export default ProcessorList;
