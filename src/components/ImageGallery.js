import React, { useState } from 'react';
import ReactFlow, { Controls, MarkerType } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import generateRandomGraph from "../graphData-generate/GenerateRandomGraph";

const ImageGallery = () => {
    const [graphData, setGraphData] = useState(generateRandomGraph); // Initial graph data
    const [key, setKey] = useState(0);

    // Function to handle refresh button click
    const handleRefresh = () => {
        setGraphData(generateRandomGraph()); // Generate new graph data
        setKey(prevKey => prevKey + 1); // Update key to force re-render
    };

    return (
        <div className="rounded-square">
            <h3>Graph</h3>
            <label>Number of processors: {graphData.num_processors}</label>
            <div style={{ width: '100%', height: '500px' }}>
                {graphData && (
                    <ReactFlow
                        key={key}
                        nodes={graphData.nodes.map(node => ({
                            id: node.id,
                            data: { label: `Node ${node.id}: ${node.weight}` },
                            position: { x: node.pos[0], y: node.pos[1] },
                        }))}
                        edges={graphData.edges.map(edge => ({
                            id: `${edge.source}-${edge.target}`,
                            source: edge.source,
                            target: edge.target,
                            label: edge.cost,
                            markerEnd: {
                                type: MarkerType.Arrow, width: 20, height: 20,
                            },
                        }))}
                        fitView={true}
                    >
                        <Controls />
                        {/*<Background variant="dots" gap={12} size={1} />*/}
                    </ReactFlow>
                )}
            </div>
            <button className="btn btn-primary mt-3" onClick={handleRefresh}>
                Refresh
            </button>
        </div>
    );
};

export default ImageGallery;
