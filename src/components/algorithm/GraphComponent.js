import React from 'react';
import ReactFlow, {Background, Controls, MarkerType} from 'reactflow';
import 'reactflow/dist/style.css';
import DownloadButton from "../drag-and-drop/DownloadButton";

const GraphComponent = ({imageSrc = null, graphData = null}) => {
    const isImage = !!imageSrc;

    return (
        <div className="rounded-square graph-placeholder">
            <h4>Graph</h4>
            <label>Number of processors: {graphData.num_processors}</label>
            {isImage ? (
                <img src={imageSrc} alt="Graph" className="img-fluid"/>
            ) : (
                graphData && (
                    <div style={{width: '100%', height: '500px'}}>
                        <ReactFlow
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
                            <Background variant="dots" gap={12} size={1}/>
                        </ReactFlow>
                    </div>
                )
            )}
        </div>
    );
};

export default GraphComponent;
