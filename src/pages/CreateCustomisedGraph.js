import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import DragAndDrop from '../components/drag-and-drop/DragAndDrop';
import 'reactflow/dist/style.css';
import {Button, Dropdown} from 'react-bootstrap';
import {useAlgorithmName} from '../contexts/algorithmNameContext';
import InfoToolTip from "../InfoToolTip";

const CreateCustomisedGraph = () => {
    const {algorithmName: paramAlgorithmName} = useParams();
    const {algorithmName, storeAlgorithmName, resetAlgorithmName} = useAlgorithmName();
    const navigate = useNavigate();
    const [graphData, setGraphData] = useState(null);
    const [localAlgorithmName, setLocalAlgorithmName] = useState("")
    const [selectedAlgorithmDisplayName, setSelectedAlgorithmDisplayName] = useState('Algorithm Selection');
    const [solveEnabled, setSolveEnabled] = useState(false);

    // Effect to handle parameter change and update algorithm name
    useEffect(() => {
        if (paramAlgorithmName) {
            storeAlgorithmName(paramAlgorithmName);
            setLocalAlgorithmName(paramAlgorithmName)
        } else {
            setLocalAlgorithmName(algorithmName)
        }
        return () => {
            resetAlgorithmName();
        };
    }, [paramAlgorithmName, storeAlgorithmName, resetAlgorithmName]);

    // Effect to update display name when algorithmName changes
    useEffect(() => {
        if (localAlgorithmName) {
            let displayName = getDisplayNameForAlgorithm(localAlgorithmName);
            setSelectedAlgorithmDisplayName(displayName);
            setLocalAlgorithmName(localAlgorithmName)
        }
    }, [localAlgorithmName]);

    // Effect to enable solve button when both algorithmName and graphData are present
    useEffect(() => {
        setSolveEnabled(localAlgorithmName !== null && graphData !== null);
    }, [localAlgorithmName, graphData]);

    // Function to handle solving the graph
    const handleSolveGraph = () => {
        navigate(`/algorithms/${localAlgorithmName}`, {state: {graphData}});
    };

    // Function to handle file upload and update graph data
    const handleFileUpload = (json) => {
        setGraphData(json);
    };

    // Function to handle selecting an algorithm from dropdown
    const handleSelectAlgorithm = (selectedAlgorithm, displayName) => {
        storeAlgorithmName(selectedAlgorithm);
        setSelectedAlgorithmDisplayName(displayName);
    };

    // Function to get display name for a given algorithm name
    const getDisplayNameForAlgorithm = (algorithmName) => {
        switch (algorithmName) {
            case 'hlfet':
                return 'HLFET (Highest Level First with Estimated Time)';
            case 'mcp':
                return 'MCT (Minimum Communication Time)';
            case 'etf':
                return 'ETF (Earliest Task First)';
            // case 'dls':
            //     return 'DLS (Dynamic Level Scheduling)';
            default:
                return 'Select an algorithm to solve the graph';
        }
    };

    return (
        <div className="container-fluid mb-3 pl-3 pr-3">
            <h1>
                Create Customised Graph{' '}
                <InfoToolTip
                    tooltipText={
                        'Create your own task graph scheduling problem. Drag nodes from the right panel to add them. ' +
                        'Connect nodes to create edges. Specify weight and cost before creation.' +
                        'Delete nodes and edges by pressing the delete key on your keyboard.'
                    }
                />
            </h1>
            <div>
                <label className="mr-2">Please select an algorithm to solve the graph:</label>
                <Dropdown className="d-inline-block">
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
                        {/*<Dropdown.Item onClick={() => handleSelectAlgorithm('dls', 'DLS (Dynamic Level Scheduling)')}>*/}
                        {/*    DLS (Dynamic Level Scheduling)*/}
                        {/*</Dropdown.Item>*/}
                    </Dropdown.Menu>
                </Dropdown>
                <Button className={"ml-3"} onClick={handleSolveGraph} disabled={!solveEnabled}>
                    Solve graph
                </Button>
            </div>

            <DragAndDrop onFileUpload={handleFileUpload}/>


        </div>
    );
};

export default CreateCustomisedGraph;
