import React, { useState } from 'react';
import Joi from 'joi-browser';
import Form from './Forms/Form';
import Input from './Forms/Input';

const LoginForm = () => {
    const [data, setdata] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: null,
        password: null
    });

    const schema = {
        username: Joi.string()
            .required()
            .label('Username'),
        password: Joi.string()
            .required()
            .label('Password')
    };

    const handleChange = e => {
        const formInput = { ...data };
        formInput[e.target.name] = e.target.value;
        setdata(formInput);
    }

    const handleSubmission = () => {
        console.log("test");
        // call backend service
    }
    
    return (
        <>
            <h1 className="pb-3 pt-1">Login</h1>
            <Form 
                data={data}
                schema={schema}
                onError={setErrors}
                onSubmission={handleSubmission}
            >
                <Input 
                    name="username"
                    value={data.username}
                    label="Username"
                    onChange={handleChange}
                    error={errors.username}
                />
                <Input
                    name="password"
                    value={data.password}
                    label="Password"
                    onChange={handleChange}
                    error={errors.password}
                />
                <button className="btn btn-primary">Login</button>
            </Form>
        </>
    );
}

export default LoginForm;