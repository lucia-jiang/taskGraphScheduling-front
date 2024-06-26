import React, { useState } from 'react';
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
        <Form.Group>
            <Form.Label>Number of processors:</Form.Label>
            <div className="input-group" style={{ backgroundColor: 'white' }}>
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    readOnly
                    style={{ backgroundColor: 'white', color: 'black' }}
                />
                <div className="input-group-append">
                    <Button variant="outline-secondary" style={{ backgroundColor: 'white', color: 'black' }} onClick={handleIncrease}>
                        +
                    </Button>
                    <Button variant="outline-secondary" style={{ backgroundColor: 'white', color: 'black' }} onClick={handleDecrease}>
                        -
                    </Button>
                </div>
            </div>
        </Form.Group>
    );
};

export default QuantityPicker;
