import React, { useState, useEffect } from 'react';
import QuantityPicker from "../components/QuantityPicker";
import GraphComponent from "../components/algorithm/GraphComponent";
import NodeProcessorMatching from "../components/NodeProcessorMatching/NodeProcessorMatching";

const TimeChallengePage = () => {
    const [assignments, setAssignments] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(10); // 3 minutes in seconds
    const [isTimeUp, setIsTimeUp] = useState(false);

    const handleAssignment = (newAssignments) => {
        setAssignments(newAssignments);
    };

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsTimeUp(true);
        }
    }, [timeRemaining]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <h1>Time Challenge</h1>
            <p>Challenge: obtain optimal solution in less than 3 minutes</p>
            <div className="timer">
                {/*TODO: once time is done, alert and stop playing*/}
                <h2>Time Remaining: {formatTime(timeRemaining)}</h2>
            </div>
            <div className="number-processors-container">
                <label htmlFor="processor-spinner" className="col-form-label">
                    Number of processors: 3
                </label>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="graph-container">
                            <GraphComponent image={"image-path"} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        {/*TODO: isDisabled not working*/}
                        <NodeProcessorMatching
                            nodes={['N1', 'N2', 'N3', 'N4', 'N5']}
                            processors={['P1', 'P2', 'P3']}
                            onAssignment={handleAssignment}
                            isDisabled={isTimeUp}
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

export default TimeChallengePage;
