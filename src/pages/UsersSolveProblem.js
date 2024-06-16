import React, { useState } from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';

// Import the JSON data
// import graphData from '../graph-examples-json/graph-1.json';
// import graphData from '../graph-examples-json/graph-2.json';
// import graphData from '../graph-examples-json/graph-3.json';
import graphData from '../graph-examples-json/graph-4.json';

const UsersSolveProblem = () => {
    const [assignments, setAssignments] = useState({});

    const handleAssignment = (newAssignments) => {
        setAssignments(newAssignments);
    };

    // Extract node IDs from graphData
    const nodeIds = graphData.nodes.map(node => node.id);

    return (
        <div className={"mb-4"}>
            <h1>Users solve problem</h1>
            <div className="container">
                <div className="number-processors-container">
                    <label htmlFor="processor-spinner" className="col-form-label">
                        Number of processors: 4
                        {/* TODO: change processors */}
                    </label>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5">
                        <div className="graph-container">
                            <GraphComponent graphData={graphData} />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <NodeProcessorMatching
                            nodes={nodeIds}
                            processors={['P1', 'P2', 'P3', 'P4']}
                            onAssignment={handleAssignment}
                            refreshButton={true}
                        />
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
                            <p>Results of algorithm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSolveProblem;
