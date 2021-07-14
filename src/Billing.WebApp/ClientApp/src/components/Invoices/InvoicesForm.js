import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Joi from 'joi-browser';
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices } from "../../store/invoices";
import { loadContacts } from "../../store/contacts";
import Spinner from '../Spinner/Spinner';
import Form from '../Forms/Form';
import Input from '../Forms/Input';
import InvoiceItemsForm from './InvoiceItemsForm';
import DateInput from '../Forms/DateInput';
import SelectInput from '../Forms/SelectInput';

const InvoicesForm = ({ history, match }) => {
    const dispatch = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);
    const allContacts = useSelector(state => state.entities.contacts.data);
    const [invoiceId] = useState(match.params.id);
    const [data, setdata] = useState({
        id: "",
        reference: "",
        status: "",
        notes: "",
        contact: {
            businessName: ""
        },
        invoiceItems: [],
        contactId: "",
        created: "",
        due: "",
        paid: ""

    });
    const [errors, setErrors] = useState({
        id: null,
        reference: null,
        status: null,
        notes: null,
        invoiceItems: null,
        contact: {
            businessName: null
        },
        created: null,
        due: null,
        paid: null
    });

    const newUrl = 'new';
    const count = allInvoices.length;

    useEffect(() => {
        dispatch(loadInvoices());
        dispatch(loadContacts());
        if (invoiceId === newUrl) return;

        const invoice = allInvoices.find(c => c.id === parseInt(invoiceId));
        if (!invoice) return;
        setdata({
            ...invoice,
            contactId: invoice.contact.id       
        });
      }, [allInvoices, allContacts, invoiceId, dispatch]);

    const schema = {
        id: Joi.number(),
        reference: Joi.string(),
        status: Joi.string(),
        invoiceItems: Joi.array()
        .items({
          keyword: Joi.string()
            .required(),
          country_code: Joi.string()
            .required(),
          language: Joi.string()
            .required(),
          depth: Joi.number()
            .required(),
        }),
    };

    const handleChange = e => {
        const formInput = JSON.parse(JSON.stringify(data));
        formInput[e.target.name] = e.target.value;
        setdata(formInput);
    }

    const handleSubmission = e => {
        e.preventDefault();
        console.log(data);
        // if (contactId === newUrl) dispatch(createContact(data));
        // else dispatch(updateContact(data));
        //history.push("/invoices");
    }

    const handleAddRepeatable = e => {
        e.preventDefault();
        console.log(e);

        //const formInput = { ...data };
        const formInput = JSON.parse(JSON.stringify(data));

        formInput.invoiceItems.push({
            order: formInput.invoiceItems[formInput.invoiceItems.length - 1] + 1,
            quantity: 0,
            price: 0,
            description: '',
            taxAmount: 0,
            taxPercentage: true,
            taxInclusive: true 
        });
        setdata(formInput);
    }

    const handleDelete = invoice => {
        if(window.confirm('Are you sure you want to delete this row?')) {
            console.log(invoice);
            // dispatch(deleteInvoice(invoice.id));
            // setInvoices(invoices.filter(c => c.id !== invoice.id));
        }
    };

    const handleContactList = () => {
        let contactData = [];

        allContacts.forEach(opt =>
            contactData.push({
                value: opt.id,
                label: opt.businessName + ': ' + opt.firstName + ' ' + opt.lastName
            })
        );

        return contactData.sort((a, b) =>  a.label > b.label ? 1 : -1)
    }

    const handleContactUpdate = () => {
        const updatedContact = allContacts.find(c => c.id === data.contactId);
        if (!updatedContact) return null;
        return updatedContact.businessName + ': ' + updatedContact.firstName + ' ' + updatedContact.lastName;
    }

    if (count <= 0 && invoiceId !== newUrl) return <Spinner showText={false} />;
    if (count >= 1 && invoiceId !== newUrl && !allInvoices.find(c => c.id === parseInt(invoiceId))) return <Redirect to="/not-found" />;
    
    const contactList = handleContactList();
    const contactLabel = handleContactUpdate();

    return (
        <>
            <h1 className="pb-3 pt-1">Invoice</h1>
            <Form 
                data={data}
                schema={schema}
                onError={setErrors}
                onSubmission={e => handleSubmission(e)}
            >
                <div className="row">
                    <div className="col-3">
                        <SelectInput
                            name="contact"
                            items={contactList}
                            value={{
                                value: data.contactId,
                                label: contactLabel
                            }}
                            path="contactId"
                            label="Contact"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-3">
                        <Input 
                            name="reference"
                            value={data.reference}
                            label="Reference"
                            onChange={handleChange}
                            error={errors.reference}
                        />
                    </div>
                    <div className="col-2">
                        <DateInput
                            name="created"
                            value={data.created}
                            label="Date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-2">
                        <DateInput
                            name="due"
                            value={data.due}
                            label="Due"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <InvoiceItemsForm
                    data={data}
                    onDelete={handleDelete}
                    onAddRepeatable={handleAddRepeatable}
                />
                <Input 
                    name="notes"
                    value={data.notes}
                    label="Notes"
                    onChange={handleChange}
                    error={errors.notes}
                />
                <DateInput
                    name="paid"
                    value={data.paid}
                    label="Paid"
                    onChange={handleChange}
                />
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary mt-2 mb-5 mr-2">Publish</button>
                        <button className="btn btn-secondary mt-2 mb-5">Save Draft</button>
                    </div>
                </div>
            </Form>
        </>
    );
}

export default InvoicesForm;