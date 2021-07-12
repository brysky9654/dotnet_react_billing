import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Joi from 'joi-browser';
import Form from './Forms/Form';
import Input from './Forms/Input';

const ContactsForm = ({ history }) => {
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        address: "",
        city: "",
        country: "",
        region: ""
    });
    const [errors, setErrors] = useState({
        firstName: null,
        lastName: null,
        businessName: null,
        address: null,
        city: null,
        country: null,
        region: null
    });

    const schema = {
        firstName: Joi.string()
            .required()
            .label('First Name'),
        lastName: Joi.string()
            .required()
            .label('Last Name'),
        businessName: Joi.string()
            .required()
            .label('Business Name'),
        email: Joi.string()
            .required()
            .label('Email'),
        address: Joi.string()
            .required()
            .label('Address'),
        city: Joi.string()
            .required()
            .label('City / Suburb'),
        country: Joi.string()
            .required()
            .label('Country'),
        region: Joi.string()
            .required()
            .label('State / Province')
    };

    const handleChange = e => {
        const formInput = { ...data };
        formInput[e.target.name] = e.target.value;
        setdata(formInput);
    }

    const selectCountry = (country) => {
        const formInput = { ...data };
        formInput.country = country;
        setdata(formInput);
      }
    
    const selectRegion = (region) => {
        const formInput = { ...data };
        formInput.region = region;
        setdata(formInput);
    }

    const handleSubmission = () => {
        console.log("test2");
        console.log(data);
        // call backend service
        history.push("/contacts");
    }
    
    return (
        <>
            <h1 className="pb-3 pt-1">Add Contact</h1>
            <Form 
                data={data}
                schema={schema}
                onError={setErrors}
                onSubmission={handleSubmission}
            >
                <Input 
                    name="firstName"
                    value={data.firstName}
                    label="First Name"
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Input 
                    name="lastName"
                    value={data.lastName}
                    label="Last Name"
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Input 
                    name="businessName"
                    value={data.businessName}
                    label="Business Name"
                    onChange={handleChange}
                    error={errors.businessName}
                />
                <Input
                    name="email"
                    value={data.email}
                    label="Email"
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    name="address"
                    value={data.address}
                    label="Street Address"
                    onChange={handleChange}
                    error={errors.address}
                />
                 <Input
                    name="city"
                    value={data.city}
                    label="City / Suburb"
                    onChange={handleChange}
                    error={errors.city}
                />
                <div className="form-group">
                    <label for="country">Country</label>
                    <CountryDropdown
                        className="form-control form-select"
                        id="country"
                        valueType="short"
                        priorityOptions={["AU"]}
                        value={data.country}
                        onChange={(country) => selectCountry(country)}
                    />
                </div>
                <div className="form-group">
                    <label for="region">State / Province</label>
                    <RegionDropdown
                        className="form-control form-select"
                        id="region"
                        countryValueType="short"
                        country={data.country}
                        value={data.region}
                        onChange={(region) => selectRegion(region)}
                    />
                </div>
                <button className="btn btn-primary mt-2 mb-5">Add New Contact</button>
            </Form>
        </>
    );
}

export default ContactsForm;