// src/components/CustomNode.js
import React from 'react';
import {Handle} from 'react-flow-renderer';
import './CustomNode.css';

const CustomNode = ({data, id}) => {
    const handleChange = (event) => {
        const newWeight = event.target.value;
        data.onChange(event, id);
    };

    return (
        <div className="custom-node">
            <div className="label">{data.label}</div>
            <input
                type="number"
                className="weight-input"
                value={data.weight}
                onChange={handleChange}
                placeholder="Weight"
            />
            <Handle type="source" position="right"/>
            <Handle type="target" position="left"/>
        </div>
    );
};

export default CustomNode;
