import React, {useRef, useCallback, useEffect, useState} from 'react';
import ReactFlow, {
    MiniMap, Background, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import './DragAndDrop.css';
import QuantityPicker from "../input-forms/QuantityPicker";
import InputLabel from "../input-forms/InputLabel";
import DownloadButton from "./DownloadButton";
import TransformToJsonButton from "./TransformToJsonButton";
import DragAndDropUpload from "./DragAndDropUpload";
import Sidebar from './Sidebar';

const initialNodes = [];

const DnDFlow = ({ onFileUpload }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [viewport, setViewport] = useState(null);
    const [edgeLabel, setEdgeLabel] = useState(5);
    const [nodeWeight, setNodeWeight] = useState(5);
    const [processorCount, setProcessorCount] = useState(3);
    const [graphData, setGraphData] = useState(null); // State to store graph data

    const handleInputChange = (valueSetter) => (value) => {
        valueSetter(value);
    };

    const handleQuantityChange = (value) => {
        setProcessorCount(value);
    };

    const onConnect = useCallback((params) => {
        if (edgeLabel !== '') {
            const edgeWithArrow = {
                ...params, markerEnd: {
                    type: MarkerType.Arrow, width: 20, height: 20,
                }, label: edgeLabel,
            };
            setEdges((eds) => addEdge(edgeWithArrow, eds));
        }
    }, [edgeLabel]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX, y: event.clientY,
        });
        const newNodeId = generateUniqueId(nodes);
        const newNode = {
            id: newNodeId,
            type,
            position,
            data: {
                label: `Node ${newNodeId}: ${nodeWeight}`,
                weight: nodeWeight,
            },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, nodes, nodeWeight]);

    const generateUniqueId = (currentNodes) => {
        let newId = 1;
        while (currentNodes.find(node => node.id === `${newId}`)) {
            newId++;
        }
        return `${newId}`;
    };

    useEffect(() => {
        if (reactFlowInstance && viewport) {
            reactFlowInstance.setTransform(viewport);
        }
    }, [viewport, reactFlowInstance]);


    useEffect(() => {
        // Convert nodes and edges to JSON format
        const json = {
            nodes: nodes.map(node => ({
                id: node.id,
                pos: [node.position.x, node.position.y],
                weight: node.data.weight,
            })),
            edges: edges.map(edge => ({
                source: edge.source,
                target: edge.target,
                cost: edge.label,
            })),
        };

        // Update graphData state
        setGraphData(json);

        // Notify parent component about graph data change
        onFileUpload(json);
    }, [nodes, edges, onFileUpload]);

    const handleFileUpload = (json) => {
        const { nodes, edges } = json;

        const validNodes = nodes.map((node) => ({
            id: node.id,
            type: 'default',
            position: { x: node.pos[0], y: node.pos[1] },
            data: { label: `Node ${node.id}: ${node.weight}`, weight: node.weight },
        }));

        const validEdges = edges.map((edge) => ({
            id: `e${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            label: edge.cost,
            markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
            },
        }));

        setNodes(validNodes);
        setEdges(validEdges);
        onFileUpload(json);
    };


    return (
        <div>
            <div className="form-group row">
                <InputLabel label="Enter edge cost" value={edgeLabel} onChange={handleInputChange(setEdgeLabel)} />
                <InputLabel label="Enter node weight" value={nodeWeight} onChange={handleInputChange(setNodeWeight)} />
                <div className="col-md-4">
                    <QuantityPicker onChange={handleQuantityChange} />
                </div>
            </div>

            <DragAndDropUpload onFileUpload={handleFileUpload} />

            <div className="dndflow">
                <ReactFlowProvider>
                    <div style={{ width: '100vw', height: '75vh' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            fitView={true}
                        >
                            <Controls />
                            <MiniMap />
                            <Background variant="dots" gap={12} size={1} />
                            <DownloadButton nodes={nodes} edges={edges} />
                            <TransformToJsonButton nodes={nodes} edges={edges} />
                        </ReactFlow>
                    </div>
                    <Sidebar />
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default DnDFlow;
