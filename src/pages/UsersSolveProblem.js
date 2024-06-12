import React, {useState} from 'react';
import QuantityPicker from "../components/QuantityPicker";
import GraphComponent from "../components/algorithm/GraphComponent";
import "../components/Components.css"
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";
import '../components/NodeProcessorMatching/NodeProcessorMatching.css';

const UsersSolveProblem = () => {
    const [assignments, setAssignments] = useState({});

    const handleAssignment = (newAssignments) => {
        setAssignments(newAssignments);
    };

    return (
        <div>
            <h1>Users solve problem</h1>
            <p>Here users solve a problem</p>
            <div className="container">
                <div className="number-processors-container">
                    <label htmlFor="processor-spinner" className="col-form-label">
                        Number of processors:
                    </label>
                    {/*TODO: i don't think quantity picker should go here*/}
                    {/*TODO: style better component*/}
                    <QuantityPicker min={0} max={10} />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="graph-container">
                            {/*TODO: change image*/}
                            <GraphComponent image={"image-path"} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/*TODO: this is hardcoded right now*/}
                        <NodeProcessorMatching
                            nodes={['N1', 'N2', 'N3', 'N4', 'N5']}
                            processors={['P1', 'P2', 'P3', 'P4']}
                            onAssignment={handleAssignment}
                        />
                    </div>
                    <div className="col-md-5">
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