import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ name, value, label, error, defaultValue, onChange }) => {

    const parseDate = () => {
        if (!value) return null;
        return new Date(Date.parse(value));
    } 

    const dateValue = parseDate(value);

    return (
        <div className="form-group date-input">
            {label ? <label htmlFor={name}>{label}</label> : null}
            <DatePicker
                className="form-control"
                dateFormat="dd/MM/yyyy"
                selected={dateValue ? dateValue : defaultValue} 
                value={dateValue ? dateValue : defaultValue} 
                onChange={value => onChange({target: {name: name, value: value}})}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

DateInput.defaultProps = {
    defaultDate: ''
}

export default DateInput;