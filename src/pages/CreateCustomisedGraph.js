import React, { useEffect, useState } from 'react';
import { useAlgorithmName } from "../contexts/algorithmNameContext";
import { useParams, useNavigate } from "react-router-dom";
import DnDFlow from "../components/drag-and-drop/DragAndDrop";
import 'reactflow/dist/style.css';
import { Button } from "react-bootstrap";
import AlgorithmDropdown from "../components/algorithm/AlgorithmDropdown";

const CreateCustomisedGraph = () => {
    const { algorithmName: paramAlgorithmName } = useParams();
    const { algorithmName, storeAlgorithmName, resetAlgorithmName } = useAlgorithmName();
    const navigate = useNavigate();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        if (paramAlgorithmName) {
            storeAlgorithmName(paramAlgorithmName);
        }
        return () => {
            resetAlgorithmName();
        };
    }, [paramAlgorithmName, storeAlgorithmName, resetAlgorithmName]);

    const handleSolveGraph = () => {
        if (algorithmName && graphData) {
            navigate(`/algorithms/${algorithmName}`, { state: { graphData } });
        }
    };

    const handleFileUpload = (json) => {
        setGraphData(json);
    };

    return (
        <div className={"mb-3"}>
            <h1>Create Customised Graph</h1>
            {algorithmName ? (
                <div>
                    <p>Algorithm name: {algorithmName}</p>
                </div>
            ) : (
                <div>
                    <p>Please select an algorithm to solve the graph.</p>
                </div>
            )}

            <DnDFlow onFileUpload={handleFileUpload} />
            {/*<AlgorithmDropdown />*/}

            <Button onClick={handleSolveGraph}>
                Solve graph
            </Button>
        </div>
    );
};

export default CreateCustomisedGraph;
