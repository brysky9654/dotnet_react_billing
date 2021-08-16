import React from 'react';

const SelectInputBasic = ({ items, name, path, value, label, error, onChange }) => {
    return (
        <div className="form-group date-input">
            {label ? <label htmlFor={name}>{label}</label> : null}
            <select 
                className="form-control form-select"
                name={name}
                id={name}
                value={value}
                defaultValue={value}
                onChange={e => onChange(e)}
            >
                {items.map(item => (
                    <option 
                        key={item.name}
                        value={item[path]}
                    >
                            {item.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

SelectInputBasic.defaultProps = {
    path: 'id'
}

export default SelectInputBasic;