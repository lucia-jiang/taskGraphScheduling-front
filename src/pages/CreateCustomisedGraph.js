import React, { useEffect } from 'react';
import {useAlgorithmName} from "../contexts/algorithmNameContext";
import {useParams} from "react-router-dom";
import DragAndDrop from "../components/drag-and-drop/DragAndDrop";

import 'reactflow/dist/style.css';

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
        <div>
            <h1>Create Customised Graph</h1>
            <p>Users create customised graphs using drag and drop features.</p>
            <DragAndDrop/>

            {algorithmName ? (
                <div>
                    <p>Algorithm name: {algorithmName}</p>
                </div>
            ) : (
                <div>
                    <p>Please select an algorithm to customise the graph.</p>
                </div>
            )}
        </div>
    );
};

export default CreateCustomisedGraph