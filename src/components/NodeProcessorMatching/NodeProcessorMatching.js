import React, { useState } from 'react';
import NodeBubble from './NodeBubble';
import ProcessorList from './ProcessorList';
import './NodeProcessorMatching.css';
import { Button } from 'react-bootstrap';

const NodeProcessorMatching = ({ nodes, processors, nodePredecessors, assignments, onAssignment, refreshButton, onRefresh }) => {
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
            setSelectedNode(null);
        }
    };

    const handleRefresh = () => {
        setSelectedNode(null);
        onRefresh(); // Call the resetState function passed as onRefresh prop
    };

    if (!Array.isArray(nodes)) {
        return null;
    }

    return (
        <div className="node-processor-matching">
            <div className="node-processor-container">
                <div className="node-list">
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
                </div>
                <div className="processor-selection">
                    {selectedNode && (
                        <>
                            <p>Select Processor for Node {selectedNode}</p>
                            <ProcessorList processors={processors} onSelect={handleProcessorSelect} />
                        </>
                    )}
                </div>
                {refreshButton && (
                    <Button className="refresh-button mt-1" onClick={handleRefresh}>Refresh Choices</Button>
                )}
            </div>
        </div>
    );
};

export default NodeProcessorMatching;
