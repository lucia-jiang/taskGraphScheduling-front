import React from 'react';

const InputLabel = ({ label, value, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value.replace(/[^0-9.]/g, ''));
    };

    return (
        <div className="col-md-4">
            <label>{label}:</label>
            <div className="input-group">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
        </div>
    );
};

export default InputLabel;
