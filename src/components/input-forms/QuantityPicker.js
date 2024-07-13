import React from 'react';
import { Form, Button } from 'react-bootstrap';

const QuantityPicker = ({ value, onChange }) => {
    const handleIncrease = () => {
        onChange(value + 1);
    };

    const handleDecrease = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    return (
        <Form.Group className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ minWidth: '200px' }}>Number of processors:</Form.Label> {/* mr-2 for margin-right */}
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    readOnly
                    style={{ backgroundColor: 'white', color: 'black', maxWidth: '100px' }}
                />
                <div className="input-group-append">
                    <Button variant="outline-secondary" onClick={handleIncrease} style={{ backgroundColor: 'white', color: 'black', border:'1px solid lightgray' }}>
                        +
                    </Button>
                    <Button variant="outline-secondary" onClick={handleDecrease} style={{ backgroundColor: 'white', color: 'black', border: '1px solid lightgray' }}>
                        -
                    </Button>
                </div>
            </div>
        </Form.Group>
    );
};

export default QuantityPicker;
