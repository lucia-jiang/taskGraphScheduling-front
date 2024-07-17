import React, {useState, useEffect} from 'react';
import "../Components.css"
import {Button, Dropdown} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const GuessNextStep = () => {
    const navigate = useNavigate();
    const [algorithmName, setAlgorithmName] = useState(null);
    const [selectedAlgorithmDisplayName, setSelectedAlgorithmDisplayName] = useState('Algorithm Selection');
    const [isGoEnabled, setIsGoEnabled] = useState(false);

    const handleSelectAlgorithm = (selectedAlgorithm, displayName) => {
        setAlgorithmName(selectedAlgorithm);
        setSelectedAlgorithmDisplayName(displayName);
    };

    useEffect(() => {
        setIsGoEnabled(algorithmName !== null);
    }, [algorithmName]);

    const handleGoClick = () => {
        navigate('/game/guess-next-step', {state: {algorithmName}}); // Pass algorithmName as state
    };

    return (
        <div className={"rounded-square"}>
            <h1>Guess the Next Step</h1>
            <p>
                Guess Next Step is a game where you put your scheduling skills to the test! Presented with a series of
                interdependent tasks in a directed acyclic graph (DAG), your mission is to <strong>predict the next
                optimal step in scheduling</strong>. First, select an algorithm to guide your strategy. Then, for each
                task, you need to correctly assign it to a processor while considering dependencies and communication
                costs. <strong>When there is a tie between which processor to choose, always select the smallest number
                processor. When there are two nodes to choose from, start by choosing the highest node</strong>. Make
                sure your selected steps follow the chosen algorithm precisely. Can you guess the correct assignment and
                stay ahead of the algorithm?
            </p>
            <div className="d-flex align-items-center">
                <Dropdown className="mr-2">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedAlgorithmDisplayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => handleSelectAlgorithm('hlfet', 'HLFET (Highest Level First with Estimated Time)')}>
                            HLFET (Highest Level First with Estimated Time)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectAlgorithm('mcp', 'MCT (Minimum Communication Time)')}>
                            MCT (Minimum Communication Time)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectAlgorithm('etf', 'ETF (Earliest Task First)')}>
                            ETF (Earliest Task First)
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button onClick={handleGoClick} disabled={!isGoEnabled}>
                    Let's go!
                </Button>
            </div>
        </div>
    );
};

export default GuessNextStep;
