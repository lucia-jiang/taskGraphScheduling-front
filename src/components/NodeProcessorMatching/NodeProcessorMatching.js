import React, { useState } from 'react';
import NodeBubble from './NodeBubble';
import ProcessorList from './ProcessorList';
import './NodeProcessorMatching.css';
import { Button } from 'react-bootstrap';

const NodeProcessorMatching = ({ nodes, processors, onAssignment, refreshButton }) => {
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

    const handleRefresh = () => {
        setAssignments({});
        setSelectedNode(null);
        onAssignment({});
    };

    return (
        <div className="node-processor-matching">
            <div className="node-list mr-1">
                {nodes.map((node, index) => (
                    <NodeBubble
                        key={index}
                        node={node}
                        onClick={() => handleNodeClick(node)}
                        isSelected={selectedNode === node}
                        isAssigned={assignments[node] !== undefined}
                    />
                ))}
                {refreshButton && Object.keys(assignments).length > 0 && (
                    <Button className={"mt-1"} onClick={handleRefresh}>Refresh Choices</Button>
                )}
            </div>
            <div className="processor-selection ml-1 mr-1">
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
