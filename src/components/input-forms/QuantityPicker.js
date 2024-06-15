import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const QuantityPicker = () => {
    const [quantity, setQuantity] = useState(3);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (<Form.Group>
        <Form.Label>Number of processors:</Form.Label>
        <div className="input-group" style={{backgroundColor: 'white'}}>
            <input
                type="text"
                className="form-control"
                value={quantity}
                readOnly
                style={{backgroundColor: 'white', color: 'black'}} // Apply inline style
            />
            <div className="input-group-append">
                <Button variant="outline-secondary" style={{backgroundColor: 'white', color: 'black'}}
                        onClick={handleIncrease}>+</Button> {/* Apply inline style */}
                <Button variant="outline-secondary" style={{backgroundColor: 'white', color: 'black'}}
                        onClick={handleDecrease}>-</Button> {/* Apply inline style */}
            </div>
        </div>
    </Form.Group>);
};

export default QuantityPicker;
