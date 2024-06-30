import React, { useState } from 'react';
import NodeBubble from './NodeBubble';
import ProcessorList from './ProcessorList';
import './NodeProcessorMatching.css';
import { Button } from 'react-bootstrap';

const NodeProcessorMatching = ({ nodes, processors, nodePredecessors, assignments, onAssignment, refreshButton }) => {
    const [selectedNode, setSelectedNode] = useState(null);

    const handleNodeClick = (node) => {
        const predecessors = nodePredecessors[node];
        const allPredecessorsAssigned = predecessors.every(predecessor => assignments[predecessor] !== undefined);

        if (allPredecessorsAssigned) {
            setSelectedNode(node);
        }
    };

    const handleProcessorSelect = (processor) => {
        if (selectedNode !== null) {
            const newAssignments = { ...assignments, [selectedNode]: processor };
            onAssignment(newAssignments);
            setSelectedNode(null); // Reset selection after assignment
        }
    };

    const handleRefresh = () => {
        setSelectedNode(null);
        onAssignment({});
    };

    // Ensure nodes is defined and is an array before mapping
    if (!Array.isArray(nodes)) {
        return null; // or handle the case where nodes is undefined or not an array
    }

    return (
        <div className="node-processor-matching">
            <div className="node-list mr-1">
                {nodes.map((node, index) => {
                    const predecessors = nodePredecessors[node];
                    const allPredecessorsAssigned = predecessors.every(predecessor => assignments[predecessor] !== undefined);

                    return (
                        <NodeBubble
                            key={index}
                            node={node}
                            onClick={() => handleNodeClick(node)}
                            isSelected={selectedNode === node}
                            isAssigned={assignments[node] !== undefined}
                            isDisabled={!allPredecessorsAssigned}
                        />
                    );
                })}
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
