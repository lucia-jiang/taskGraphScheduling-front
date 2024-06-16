import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Panel } from 'reactflow';

const TransformToJsonButton = ({ nodes, edges }) => {
    const transformToJson = async () => {
        const graphData = {
            nodes: nodes.map((node) => ({
                id: node.id,
                weight: node.data.weight,
                pos: [node.position.x, node.position.y],
            })),
            edges: edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
                cost: edge.label,
            }))
        };
        console.log(graphData)
        const json = JSON.stringify(graphData, null, 2);

        try {
            const response = await axios.post('http://localhost:8000/graph/properties', graphData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    return (
        <Panel>
            <Button className={"mt-5"} onClick={transformToJson}>
                Transform to JSON
            </Button>
        </Panel>
    );
};

export default TransformToJsonButton;
