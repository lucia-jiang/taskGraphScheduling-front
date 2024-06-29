import React, { useState, useEffect } from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';
import axios from 'axios';

// Import the JSON data
import graphData from '../graph-examples-json/graph-1.json';
// import graphData from '../graph-examples-json/graph-2.json';
// import graphData from '../graph-examples-json/graph-3.json';
// import graphData from '../graph-examples-json/graph-4.json';

const fetchAlgorithmResults = async () => {
    const hlfet = await axios.post('http://localhost:8000/algorithm/hlfet-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    const mcp = await axios.post('http://localhost:8000/algorithm/mcp-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    const etf = await axios.post('http://localhost:8000/algorithm/etf-steps', graphData, {
        headers: { 'Content-Type': 'application/json' }
    });
    return {
        algorithm1: { time: (hlfet.data[hlfet.data.length-1])["details"]["total_time"] },
        algorithm2: { time: (mcp.data[mcp.data.length-1])["details"]["total_time"] },
        algorithm3: { time: (etf.data[etf.data.length-1])["details"]["total_time"] }
    };
};

const UsersSolveProblem = () => {
    const [assignments, setAssignments] = useState({});
    const [finished, setFinished] = useState(false);
    const [algorithmResults, setAlgorithmResults] = useState(null);

    const handleAssignment = (newAssignments) => {
        setAssignments(newAssignments);
        setFinished(false); // Reset finished state when assignments change
    };

    const handleFinished = async () => {
        try {
            const results = await fetchAlgorithmResults(); // Replace with actual API call
            setAlgorithmResults(results);
            setFinished(true);
        } catch (error) {
            console.error('Error fetching algorithm results:', error);
        }
    };

    // Extract node IDs from graphData
    const nodeIds = graphData.nodes.map(node => node.id);

    // Extract number of processors from graphData
    const numProcessors = graphData.num_processors || 4; // Default to 4 if num_processors is not defined

    // Generate a list of processors based on num_processors
    const processors = Array.from({ length: numProcessors }, (_, i) => `P${i + 1}`);

    return (
        <div className={"mb-4"}>
            <h1>Users solve problem</h1>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                        <GraphComponent graphData={graphData} />
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={processors}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                        />

                        {Object.keys(assignments).length === nodeIds.length && !finished && (
                            <button className="btn btn-primary mt-2" onClick={handleFinished}>
                                Finished
                            </button>
                        )}
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="assignment-container">
                            <h3>Assignment Details</h3>
                            <ul>
                                {Object.entries(assignments).map(([node, processor], index) => (
                                    <li key={index}>Node {node} assigned to Processor {processor}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="results-container">
                            <h3>Results</h3>
                            {finished && algorithmResults && (
                                <ul>
                                    <li>HLFET algorithm time: {algorithmResults.algorithm1.time}</li>
                                    <li>MCP algorithm time: {algorithmResults.algorithm2.time}</li>
                                    <li>ETF algorithm time: {algorithmResults.algorithm3.time}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSolveProblem;
