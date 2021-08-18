import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Joi from 'joi-browser';
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices, createInvoice, updateInvoice } from "../../store/invoices";
import { loadInvoiceTaxes } from "../../store/invoiceTaxes";
import Spinner from '../Spinner/Spinner';
import Form from '../Forms/Form';
import Button from '../Forms/Button';
import InvoiceFormHeader from './InvoiceFormHeader';
import InvoiceFormBody from './InvoiceFormBody';
import InvoiceFormFooter from './InvoiceFormFooter';
import InvoiceTotal from './InvoiceTotal';

const InvoicesForm = ({ match }) => {
    const dispatch = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);
    const invoiceTaxes = useSelector(state => state.entities.invoiceTaxes.data);
    const serverError = useSelector(state => state.entities.invoices.error);
    const loading = useSelector(state => state.entities.invoices.loading);
    const saved = useSelector(state => state.entities.invoices.saved);
    const savedId = useSelector(state => state.entities.invoices.savedId);
    const [invoiceId, setInvoiceId] = useState(match.params.id);
    const [data, setdata] = useState({
        id: "",
        reference: "",
        status: "DRAFT",
        notes: "",
        contact: {
            businessName: ""
        },
        invoiceItems: [
            {
                description: "",
                order: 1,
                price: 0,
                quantity: 1,
                taxAmount: 0,
            }
        ],
        contactId: "",
        created: (new Date().toString()),
        due: (new Date(new Date().setDate(new Date().getDate() + 7))).toString(),
        paid: "",
        taxInclusive: 1
    });
    const [errors, setErrors] = useState({
        id: null,
        reference: null,
        status: null,
        notes: null,
        invoiceItems: [
            {
                description: null,
                order: null,
                price: null,
                quantity: null,
                taxAmount: invoiceTaxes.length > 0 ? invoiceTaxes[0].amount : 0,
                taxPercentage: true,
                invoiceTaxId: invoiceTaxes.length > 0 ? invoiceTaxes[0].id : null
            }
        ],
        contact: {
            businessName: null
        },
        contactId: null,
        created: null,
        due: null,
        paid: null,
        taxInclusive: null,
        invoiceTaxes: null
    });

    const newUrl = 'new';
    const count = allInvoices.length;



    useEffect(() => {
        dispatch(loadInvoices());
        dispatch(loadInvoiceTaxes());

        // if (invoiceTaxes.length > 0) {
        //     let initialData = JSON.parse(JSON.stringify(data));
        //     if (initialData !== data) {
        //         initialData.invoiceItems[0].invoiceTaxId = invoiceTaxes[0].id;
        //         initialData.invoiceItems[0].taxAmount = invoiceTaxes[0].amount;
        //         setdata({
        //             ...initialData,
        //         });
        //     }
        if (invoiceId === newUrl) {
            return;
        }
        const invoice = allInvoices.find(c => c.id === parseInt(invoiceId));
        if (!invoice) return;
        setdata({
            ...invoice,
            contactId: invoice.contact.id       
        });
      }, [allInvoices, invoiceTaxes, invoiceId, dispatch]);

    const schema = {
        reference: Joi.string().allow(null, '').label('Reference'),
        status: Joi.string().label('Status'),
        invoiceItems: Joi.array()
        .items({
            description: Joi.string().allow(null, ''),
            order: Joi.number().label('Order'),
            price: Joi.number().label('Price'),
            quantity: Joi.number().positive().label('Quantity'),
            taxAmount: Joi.number(),
            invoiceTaxId: Joi.number()
        }),
        contactId: Joi.number().required().error(() => {
            return {
              message: 'Contact is required.',
            }
          }),
        created: Joi.label('Date'),
        due: Joi.label('Due'),
        paid: Joi.allow(null, '').label('Paid'),
        notes: Joi.string().allow(null, '').label('Notes'),
        taxInclusive: Joi.number()
    };

    const handleChange = e => {
        const formInput = JSON.parse(JSON.stringify(data));
        formInput[e.target.name] = e.target.value;
        setdata(formInput);
    }

    const handleSubmission = e => {
        const submitType = e.nativeEvent.submitter.name;
        let confirmed = true;

        if (submitType === "published") confirmed = window.confirm('Are you sure you want to ' + (data.status === "PUBLISHED" ? 'save' : 'publish') + ' this invoice?');
        if (confirmed) {
            const formInput = JSON.parse(JSON.stringify(data));
            formInput.status = submitType.toUpperCase();
            setdata(formInput);
            if (invoiceId === newUrl) dispatch(createInvoice(formInput));
            else dispatch(updateInvoice(formInput));
        }
    }

    const handleAddRepeatable = e => {
        e.preventDefault();
        const formInput = JSON.parse(JSON.stringify(data));

        let orderId = 1;
        if (formInput.invoiceItems.length > 0) orderId = formInput.invoiceItems[formInput.invoiceItems.length -1].order + 1;

        formInput.invoiceItems.push({
            id: 'new' + orderId,
            order: orderId,
            quantity: 1,
            price: 0,
            description: '',
            taxAmount: invoiceTaxes.length > 0 ? invoiceTaxes[0].amount : 0,
            taxPercentage: true,
            invoiceTaxId: invoiceTaxes.length > 0 ? invoiceTaxes[0].id : null
        });
        setdata(formInput);
    }

    if (count <= 0 && invoiceId !== newUrl) return <Spinner showText={false} />;
    if (count >= 1 && invoiceId !== newUrl && !allInvoices.find(c => c.id === parseInt(invoiceId))) return <Redirect to="/not-found" />;
    if (saved && savedId != null && invoiceId === newUrl) setInvoiceId(savedId);
    //if (saved && savedId != null && invoiceId !== newUrl) return <Redirect to={"/invoices/" + savedId} />

    let invoiceType = "Invoice";
    if (invoiceId === newUrl) invoiceType = "Create Invoice";
    else invoiceType = "Invoice #" + data.id;

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <h1 className="pb-3 pt-1">{invoiceType}</h1>
                </div>
                <div className="col-4">
                    <h4 className={data.status === "PUBLISHED" ? "pb-3 pt-4 text-right text-success" : "pb-3 pt-4 text-right"}>
                        {data.status.charAt(0).toUpperCase() + data.status.substr(1).toLowerCase()}
                    </h4>
                </div>
            </div>
            <Form 
                data={data}
                schema={schema}
                onError={setErrors}
                onSubmission={e => handleSubmission(e)}
            >
                <InvoiceFormHeader
                    data={data}
                    errors={errors}
                    onChange={handleChange}
                />
                <InvoiceFormBody
                    data={data.invoiceItems}
                    invoiceTaxes={invoiceTaxes}
                    errors={errors}
                    path="invoiceItems"
                    onChange={handleChange}
                    onAddRepeatable={handleAddRepeatable}
                />
                <InvoiceTotal 
                    data={data.invoiceItems}
                    taxInclusive={JSON.parse(data.taxInclusive)}
                />
                <InvoiceFormFooter
                    data={data}
                    errors={errors}
                    onChange={handleChange}
                />
                {serverError
                ?   <div className="row">
                        <div className="col">
                            <div className="alert alert-danger">{serverError}</div>
                        </div>
                    </div>
                : null}
                {saved && !loading
                ?   <div className="row">
                        <div className="col">
                            <div className="alert alert-success">Invoice saved</div>
                        </div>
                    </div>
                : null}
                <div className="row">
                    <div className="col">
                        <Button name="published" loading={loading} text={data.status === "PUBLISHED" && invoiceId !== newUrl ? "Save" : "Publish" } styles="btn btn-primary mt-2 mb-5 mr-2" />
                        {data.status === "PUBLISHED" && invoiceId !== newUrl ? null : <Button name="draft" loading={null} text="Save Draft" styles="btn btn-secondary mt-2 mb-5" /> }
                    </div>
                </div>
            </Form>
        </>
    );
}

export default InvoicesForm;