import React from 'react';
import Joi from 'joi-browser';

const Form = ({ data, schema, children, onError, onSubmission }) => {

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, schema, options);
        
        if (!error) return null;
        
        const formErrors = {};
        for (let item of error.details) formErrors[item.path[0]] = item.message;

        return formErrors;
    };

    const handleSubmit = e => {
        e.preventDefault();

        const formErrors = validate();
        onError(formErrors || {});
        if (formErrors) return;

        onSubmission();
    }

    return (
        <form onSubmit={handleSubmit}>
           {children}
        </form>
    );
}

export default Form;