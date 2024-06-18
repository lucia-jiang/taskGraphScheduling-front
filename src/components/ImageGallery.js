import React, {useState} from 'react';
import ReactFlow, {Background, Controls, MarkerType} from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';

// Import your JSON graph data
import graphData1 from '../graph-examples-json/graph-1.json';
import graphData2 from '../graph-examples-json/graph-2.json';
import graphData3 from '../graph-examples-json/graph-3.json';
import graphData4 from '../graph-examples-json/graph-4.json';

const ImageGallery = () => {
    // Array of graph data
    const graphDataArray = [graphData1, graphData2, graphData3, graphData4];

    // State to track current index and force re-render
    const [currentIndex, setCurrentIndex] = useState(0);
    const [key, setKey] = useState(0);

    // Function to handle refresh button click
    const handleRefresh = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % graphDataArray.length);
        setKey(prevKey => prevKey + 1); // Update key to force re-render
    };

    // Get current graph data based on currentIndex
    const graphData = graphDataArray[currentIndex];

    return (
        <div className="rounded-square">
            <h3>Graph</h3>
            <div style={{width: '100%', height: '500px'}}>
                {graphData && (
                    <ReactFlow
                        key={key}
                        nodes={graphData.nodes.map(node => ({
                            id: node.id,
                            data: {label: `Node ${node.id}: ${node.weight}`},
                            position: {x: node.pos[0], y: node.pos[1]},
                        }))}
                        edges={graphData.edges.map(edge => ({
                            id: `${edge.source}-${edge.target}`,
                            source: edge.source,
                            target: edge.target,
                            label: edge.cost,
                            markerEnd: {
                                type: MarkerType.Arrow, width: 20, height: 20,
                            }
                        }))}
                        fitView={true}
                    >
                        <Controls/>
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
