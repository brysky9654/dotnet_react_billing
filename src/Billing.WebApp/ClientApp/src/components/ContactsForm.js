import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Joi from 'joi-browser';
import { useDispatch, useSelector } from "react-redux";
import { loadContacts, createContact, updateContact } from "../store/contacts";
import Spinner from '../components/Spinner/Spinner';
import Form from './Forms/Form';
import Input from './Forms/Input';

const ContactsForm = ({ history, match }) => {
    const dispatch = useDispatch();
    const allContacts = useSelector(state => state.entities.contacts.data);
    const [contactId] = useState(match.params.id);
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        address: "",
        city: "",
        country: "",
        state: ""
    });
    const [errors, setErrors] = useState({
        firstName: null,
        lastName: null,
        businessName: null,
        address: null,
        city: null,
        country: null,
        state: null
    });

    const newUrl = 'new';
    const count = allContacts.length;

    useEffect(() => {
        dispatch(loadContacts());
        // const contactId = match.params.id;
        if (contactId === newUrl) return;

        const contact = allContacts.find(c => c.id === parseInt(contactId));
        //if (!contact) return history.replace('/not-found');
        if (!contact) return;
        setdata(contact);
      }, [allContacts, contactId, dispatch]);

    const schema = {
        id: Joi.number(),
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
        state: Joi.string()
        .required()
        .label('State / Province'),
        favourited: Joi.boolean(),
        created: Joi.string(),
        updated: Joi.string()
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
        formInput.state = region;
        setdata(formInput);
    }

    const handleSubmission = () => {
        console.log(data);
        if (contactId === newUrl) dispatch(createContact(data));
        else dispatch(updateContact(data));

        history.push("/contacts");
    }

    if (count <= 0 && contactId !== newUrl) return <Spinner showText={false} />;
    if (count >= 1 && contactId !== newUrl && !allContacts.find(c => c.id === parseInt(contactId))) return <Redirect to="/not-found" />;
    
    return (
        <>
            <h1 className="pb-3 pt-1">{ contactId === newUrl ? "Add New" : "Update"} Contact</h1>
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
                    <label htmlFor="country">Country</label>
                    <CountryDropdown
                        className="form-control form-select"
                        id="country"
                        priorityOptions={["AU"]}
                        value={data.country}
                        onChange={(country) => selectCountry(country)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State / Province</label>
                    <RegionDropdown
                        className="form-control form-select"
                        id="state"
                        country={data.country}
                        value={data.state}
                        onChange={(state) => selectRegion(state)}
                    />
                </div>
                <button className="btn btn-primary mt-2 mb-5">{ contactId === newUrl ? "Add New" : "Update"} Contact</button>
            </Form>
        </>
    );
}

export default ContactsForm;