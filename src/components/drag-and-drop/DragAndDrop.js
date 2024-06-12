import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Background,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './DragAndDrop.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => {
            const edgeWithArrow = {
                ...params,
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 20,
                    height: 20,
                },
            };
            setEdges((eds) => addEdge(edgeWithArrow, eds));
        },
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            // Update the state with the new node
            setNodes((nds) => nds.concat(newNode));

            // Optionally, you can also fit the view to display the new node
            if (reactFlowInstance) {
                reactFlowInstance.fitView();
            }
        },
        [reactFlowInstance]
    );


    useEffect(() => {
        // Ensure React Flow re-renders after edges change
        if (reactFlowInstance) {
            reactFlowInstance.fitView();
        }
    }, [edges, reactFlowInstance]);

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div style={{ width: '100vw', height: '50vh' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Controls />
                        <MiniMap />*/}
                        {/*        <Background variant="dots" gap={12} size={1} />*/}
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
