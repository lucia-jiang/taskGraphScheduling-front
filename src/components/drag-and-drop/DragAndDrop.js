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
    const [viewport, setViewport] = useState(null);
    const [edgeLabel, setEdgeLabel] = useState('');

    const handleInputChange = (event) => {
        const input = event.target.value;
        // Validate if input is a number
        if (!isNaN(input)) {
            setEdgeLabel(input);
        }
    };

    const onConnect = useCallback(
        (params) => {
            if (edgeLabel !== '') {
                const edgeWithArrow = {
                    ...params,
                    markerEnd: {
                        type: MarkerType.Arrow,
                        width: 20,
                        height: 20,
                    },
                    label: edgeLabel,
                };
                setEdges((eds) => addEdge(edgeWithArrow, eds));
                setEdgeLabel('');
            }
        },
        [edgeLabel]
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

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    useEffect(() => {
        if (reactFlowInstance && viewport) {
            reactFlowInstance.setTransform(viewport);
        }
    }, [viewport, reactFlowInstance]);

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div style={{ width: '100vw', height: '50vh' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <input
                        type="text"
                        value={edgeLabel}
                        onChange={handleInputChange}
                        placeholder="Enter label (only numbers)"
                    />
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView={false} // Disable fitView
                    >
                        <Controls />
                        <MiniMap />
                        <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
