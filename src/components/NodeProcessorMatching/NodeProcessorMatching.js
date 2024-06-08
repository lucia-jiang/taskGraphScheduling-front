// src/components/NodeProcessorMatching.js
import React, { useState } from 'react';
import NodeBubble from './NodeBubble';
import ProcessorList from './ProcessorList';
import './NodeProcessorMatching.css';

const NodeProcessorMatching = ({ nodes, processors, onAssignment }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [assignments, setAssignments] = useState({});

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    const handleProcessorSelect = (processor) => {
        if (selectedNode !== null) {
            const newAssignments = { ...assignments, [selectedNode]: processor };
            setAssignments(newAssignments);
            onAssignment(newAssignments);
            setSelectedNode(null); // Reset selection after assignment
        }
    };

    return (
        <div className="node-processor-matching">
            <div className="node-list">
                {nodes.map((node, index) => (
                    <NodeBubble
                        key={index}
                        node={node}
                        onClick={() => handleNodeClick(node)}
                        isSelected={selectedNode === node}
                        isAssigned={assignments[node] !== undefined}
                    />
                ))}
            </div>
            <div className="processor-selection">
                {selectedNode && (
                    <>
                        <p>Select Processor for Node {selectedNode}</p>
                        <ProcessorList processors={processors} onSelect={handleProcessorSelect} />
                    </>
                )}
            </div>
        </div>
    );
};

export default NodeProcessorMatching;
