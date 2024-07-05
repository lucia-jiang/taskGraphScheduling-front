import React from 'react';
import {Button} from 'react-bootstrap';
import {Panel} from 'reactflow';

const TransformToJsonButton = ({nodes, edges, numProcessors}) => {
    const transformToJson = () => {
        const graphData = {
            num_processors: numProcessors,
            nodes: nodes.map((node) => ({
                id: node.id,
                weight: Number(node.data.weight), // Convert weight to a number
                pos: [node.position.x, node.position.y],
            })),
            edges: edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
                cost: Number(edge.label), // Convert cost to a number
            }))
        };
        const json = JSON.stringify(graphData, null, 2);

        // Create a blob with the JSON data
        const blob = new Blob([json], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'graphData.json';
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Panel>
            <Button className="mt-5" onClick={transformToJson}>
                Download JSON
            </Button>
        </Panel>
    );
};

export default TransformToJsonButton;
