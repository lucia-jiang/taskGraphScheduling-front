// src/pages/GenerateGraphPage.js
import React, { useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Controls,
    MiniMap,
    Background,
} from 'react-flow-renderer';
import CustomNode from '../components/CustomNode';
import './GenerateGraphPage.css';

const initialElements = [
    { id: '1', type: 'custom', data: { label: 'Node 1', weight: 1 }, position: { x: 250, y: 5 } },
    { id: '2', type: 'custom', data: { label: 'Node 2', weight: 2 }, position: { x: 100, y: 100 } },
    { id: '3', type: 'custom', data: { label: 'Node 3', weight: 3 }, position: { x: 400, y: 100 } },
];

const GenerateGraphPage = () => {
    const [elements, setElements] = useState(initialElements);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => {
            const edgesChanges = applyEdgeChanges(elementsToRemove, els);
            const nodesChanges = applyNodeChanges(elementsToRemove, els);
            return [...edgesChanges, ...nodesChanges];
        });
    };
    const onLoad = (rfi) => {
        setReactFlowInstance(rfi);
        rfi.fitView();
    };

    const onChangeWeight = (event, id) => {
        const newWeight = event.target.value;
        setElements((els) =>
            els.map((el) => {
                if (el.id === id) {
                    el.data = { ...el.data, weight: newWeight };
                }
                return el;
            })
        );
    };

    return (
        <div style={{ height: '90vh' }}>
            <ReactFlowProvider>
                <ReactFlow
                    elements={elements}
                    onConnect={onConnect}
                    onElementsRemove={onElementsRemove}
                    onLoad={onLoad}
                    deleteKeyCode={46} /* 'delete'-key */
                    onNodeDragStop={(_, node) => console.log('drag stop', node)}
                    onElementClick={(_, element) => console.log('click', element)}
                    nodeTypes={{ custom: CustomNode }}
                >
                    <Controls />
                    <MiniMap />
                    <Background />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default GenerateGraphPage;
