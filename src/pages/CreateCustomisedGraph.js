import React, { useState, useEffect } from 'react';
import {useAlgorithmName} from "../contexts/algorithmNameContext";
import {useParams} from "react-router-dom";

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
            {algorithmName ? (
                <div>
                    <p>Algorithm name: {algorithmName}</p>
                </div>
            ) : (
                <div>
                    <p>Please select an algorithm to customise the graph.</p>
                </div>
            )}
            {/*<Graph />*/}
        </div>
    );
};

export default CreateCustomisedGraph