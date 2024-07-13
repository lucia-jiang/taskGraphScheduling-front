import React from 'react';
import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import DownloadOptions from "../drag-and-drop/DownloadOptions";
import InfoTooltip from "../../InfoToolTip";

const GraphComponent = ({ graphData }) => {
    if (!graphData) {
        return null; // or handle loading state or empty state
    }

    const nodes = graphData.nodes.map(node => ({
        id: node.id,
        data: { label: `Node ${node.id}: ${node.weight}` },
        position: { x: node.pos[0], y: node.pos[1] },
    }));

    const edges = graphData.edges.map(edge => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        label: edge.cost,
        markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
    }));

    return (
        <div className="rounded-square graph-placeholder">
            <h4>
                Graph{' '}
                <InfoTooltip tooltipText={"Use your cursor to move the graph and scroll to zoom in or out. " +
                    "Use the left panel to zoom in, zoom out, or center the view."}/>
            </h4>
            <label>Number of processors: {graphData.num_processors}</label>
            <div style={{ width: '100%', height: '500px' }}>
                <ReactFlow
                    key={JSON.stringify(graphData)}
                    nodes={nodes}
                    edges={edges}
                    fitView={true}
                >
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                    <DownloadOptions nodes={nodes} edges={edges} numProcessors={graphData.num_processors}/>
                </ReactFlow>
            </div>
        </div>
    );
};

export default GraphComponent;
