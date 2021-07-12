import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label type="text" htmlFor={name}>{label}</label>
            <input
                id={name}
                type="text"
                className="form-control"
                name={name}
                value={value}
                onChange={e => onChange(e)}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;