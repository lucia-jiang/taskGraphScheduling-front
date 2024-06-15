import React from 'react';
import {Button} from "react-bootstrap";
import {Panel} from "reactflow";

const TransformToJsonButton = ({nodes, edges}) => {
    const transformToJson = () => {
        const graphData = {
            nodes: nodes.map((node) => ({
                id: node.id, weight: node.data.weight, pos: [node.position.x, node.position.y],
            })), edges: edges.map((edge) => ({
                source: edge.source, target: edge.target, cost: edge.label,
            }))
        };
        const json = JSON.stringify(graphData, null, 2);
        console.log(json);
        // Here you can handle the JSON as needed, e.g., store it in state or send it to an API.
    };

    return (<Panel position={"top-right"}>
            <Button className={"mt-5"} onClick={transformToJson}>
                Transform to JSON
            </Button>
        </Panel>

    );
};

export default TransformToJsonButton;
