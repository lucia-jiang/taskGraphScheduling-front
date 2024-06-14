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
import QuantityPicker from "../input-forms/QuantityPicker";
import InputLabel from "../input-forms/InputLabel";
import DownloadButton from "./DownloadButton";

const initialNodes = []

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [viewport, setViewport] = useState(null);
    // TODO: default weight and cost
    const [edgeLabel, setEdgeLabel] = useState(5);
    const [nodeWeight, setNodeWeight] = useState(5);
    const [processorCount, setProcessorCount] = useState(3);

    const handleInputChange = (valueSetter) => (value) => {
        valueSetter(value);
    };

    const handleQuantityChange = (value) => {
        setProcessorCount(value);
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
                data: { label: `Node ${nodes.length + 1}: ${nodeWeight}`, weight: nodeWeight },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, nodes, nodeWeight]
    );

    useEffect(() => {
        if (reactFlowInstance && viewport) {
            reactFlowInstance.setTransform(viewport);
        }
    }, [viewport, reactFlowInstance]);

    return (
        <div>
            <div className="form-group row">
                <InputLabel label="Enter edge cost" value={edgeLabel} onChange={handleInputChange(setEdgeLabel)} />
                <InputLabel label="Enter node weight" value={nodeWeight} onChange={handleInputChange(setNodeWeight)} />
                <div className="col-md-4">
                    <QuantityPicker onChange={handleQuantityChange} />
                </div>
            </div>



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
                        fitView={false} // Disable fitView
                    >
                        <Controls />
                        <MiniMap />
                        <Background variant="dots" gap={12} size={1} />
                        <DownloadButton/>
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
        </div>
    );
};

export default DnDFlow;
