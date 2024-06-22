import React, { useEffect } from 'react';
import { useAlgorithmName } from "../contexts/algorithmNameContext";
import { useParams } from "react-router-dom";
import DragAndDrop from "../components/drag-and-drop/DragAndDrop";
import 'reactflow/dist/style.css';
import { Button } from "react-bootstrap";
import AlgorithmDropdown from "../components/algorithm/AlgorithmDropdown";

const CreateCustomisedGraph = () => {
    const { algorithmName: paramAlgorithmName } = useParams();
    const { algorithmName, storeAlgorithmName, resetAlgorithmName } = useAlgorithmName();

    useEffect(() => {
        if (paramAlgorithmName) {
            storeAlgorithmName(paramAlgorithmName);
        }
        return () => {
            resetAlgorithmName();
        };
    }, [paramAlgorithmName, storeAlgorithmName, resetAlgorithmName]);

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

            <DragAndDrop />
            <AlgorithmDropdown />
            {/*TODO: disabled not working*/}
            <Button disabled={!algorithmName || algorithmName === 'Algorithm Selection'}>
                Solve graph
            </Button>
        </div>
    );
};

export default CreateCustomisedGraph;
