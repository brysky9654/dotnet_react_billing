import React from 'react';

const Input = ({ name, label, inputType, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label type={inputType} htmlFor={name}>{label}</label>
            <input
                id={name}
                type={inputType}
                className="form-control"
                name={name}
                value={value}
                onChange={e => onChange(e)}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

Input.defaultProps = {
    inputType: 'text'
}

export default Input;