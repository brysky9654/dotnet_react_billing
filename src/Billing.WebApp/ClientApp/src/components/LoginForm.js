import React, { useState } from 'react';
import Joi from 'joi-browser';
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../store/auth";
import Form from './Forms/Form';
import Input from './Forms/Input';
import Button from './Forms/Button';

const LoginForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.entities.auth.loading);
    const serverError = useSelector(state => state.entities.auth.error);
    const [data, setData] = useState({
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
        setData(formInput);
    }

    const handleSubmission = () => {
        dispatch(authLogin(data));
    }
    
    return (
        <div className="login-form">
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
                    inputType="password"
                    onChange={handleChange}
                    error={errors.password}
                />
                <Button loading={loading} text="Login" />
                { serverError ? <div className="alert alert-danger mt-3">{ serverError }</div> : null }
            </Form>
        </div>
    );
}

export default LoginForm;