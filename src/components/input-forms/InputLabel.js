import React from 'react';

const InputLabel = ({ label, value, onChange }) => {
    const handleChange = (e) => {
        // Replace non-numeric characters except decimal point
        let sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
        // Ensure only one decimal point is present
        sanitizedValue = sanitizedValue.replace(/(\..*)\./g, '$1');

        // Update the value via onChange callback
        onChange(sanitizedValue);
    };

    return (
        <div className="form-group col-md-4 d-flex align-items-center">
            <label className="col-form-label">{label}:</label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className="form-control ml-1"
                style={{ maxWidth: '350px' }}
            />
        </div>
    );
};

export default InputLabel;
