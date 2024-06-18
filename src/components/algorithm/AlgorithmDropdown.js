import React, {useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

const AlgorithmDropdown = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Algorithm Selection');

    const handleSelect = (algorithmName) => {
        setSelectedAlgorithm(algorithmName);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedAlgorithm}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="#/algorithm-1" onClick={() => handleSelect('Algorithm 1')}>
                    Algorithm 1
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#/algorithm-2" onClick={() => handleSelect('Algorithm 2')}>
                    Algorithm 2
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#/algorithm-3" onClick={() => handleSelect('Algorithm 3')}>
                    Algorithm 3
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#/algorithm-4" onClick={() => handleSelect('Algorithm 4')}>
                    Algorithm 4
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AlgorithmDropdown;
