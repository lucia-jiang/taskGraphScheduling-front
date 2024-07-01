import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const AlgorithmDropdown = ({ onSelect }) => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Algorithm Selection');

    const handleSelect = (algorithmName, displayName) => {
        setSelectedAlgorithm(displayName);
        onSelect(algorithmName, displayName); // Pass both algorithmName and displayName back to the parent component
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedAlgorithm}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSelect('hlfet', 'HLFET (Highest Level First with Estimated Time)')}>
                    HLFET (Highest Level First with Estimated Time)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect('mcp', 'MCT (Minimum Communication Time)')}>
                    MCT (Minimum Communication Time)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect('etf', 'ETF (Earliest Task First)')}>
                    ETF (Earliest Task First)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect('dls', 'DLS (Dynamic Level Scheduling)')}>
                    DLS (Dynamic Level Scheduling)
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AlgorithmDropdown;
