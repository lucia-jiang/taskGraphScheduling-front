import React, {useState} from 'react';
import GraphComponent from "../components/algorithm/GraphComponent";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';
import AlgorithmDropdown from "../components/algorithm/AlgorithmDropdown";

const GuessNextStepPage = () => {
    const [assignments, setAssignments] = useState({});

    const handleAssignment = (newAssignments) => {
        setAssignments(newAssignments);
    };

    return (
        <div>
            <h1>Guess the next step</h1>
            <p>Guess the next step</p>
            <label>Select the algorithm: </label>
            <AlgorithmDropdown/>
            <div className="container">
                <div className="number-processors-container">
                    <label htmlFor="processor-spinner" className="col-form-label">
                        Number of processors: 3
                        {/* TODO: change processors */}
                    </label>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="graph-container">
                            {/* TODO: change image */}
                            <GraphComponent image={"image-path"}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        {/* TODO: this is hardcoded right now */}
                        <NodeProcessorMatching
                            nodes={['N1', 'N2', 'N3', 'N4', 'N5']}
                            processors={['P1', 'P2', 'P3', 'P4']}
                            onAssignment={handleAssignment}
                            refreshButton={false}
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

export default GuessNextStepPage;
