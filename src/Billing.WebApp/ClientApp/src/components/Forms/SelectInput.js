import React, { useState } from 'react';
import Select from 'react-select';

const SelectInput = ({ items, name, value, label, path, onChange }) => {
    return (
        <div className="form-group date-input">
            {label ? <label htmlFor={name}>{label}</label> : null}
            <Select
                value={value}
                defaultValue={value}
                onChange={value => onChange({target: {name: path, value: value.value}})}
                options={items}
            />
        </div>
    );
}

SelectInput.defaultProps = {
    items: [
        { value: '', label: 'Not Found' }
    ],
    path: 'id'
}

export default SelectInput;