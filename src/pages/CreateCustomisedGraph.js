import React, { useState, useEffect } from 'react';
import Graph from "../components/Graph";
import {useShortName} from "../contexts/ShortNameContext";

const CreateCustomisedGraph = () => {
    const { shortName, resetShortName } = useShortName();

    useEffect(() => {
        return () => {
            resetShortName(); // Reset the shortName when the component unmounts
        };
    }, []);

    return (
        <div>
            <h1>Create Customised Graph</h1>
            <p>Users create customised graphs using drag and drop features.</p>
            {shortName && <p> Short name: {shortName}</p>}
            <Graph/>
            {/*<Graph/>*/}
        </div>
    );
};

export default CreateCustomisedGraph