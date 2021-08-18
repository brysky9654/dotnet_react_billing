import React, { useState, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices } from "../../store/invoices";
import { loadInvoiceTaxes } from "../../store/invoiceTaxes";
import Spinner from '../Spinner/Spinner';
import InvoiceViewHeader from './InvoiceViewHeader';
import InvoiceViewBody from './InvoiceViewBody';
import InvoiceViewFooter from './InvoiceViewFooter';
import InvoiceTotal from './InvoiceTotal';

const InvoicesView = ({ match }) => {
    const dispatch = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);
    const invoiceTaxes = useSelector(state => state.entities.invoiceTaxes.data);
    const [invoiceId] = useState(match.params.id);
    const [data, setdata] = useState();
  
    const count = allInvoices.length;

    useEffect(() => {
        dispatch(loadInvoices());
        dispatch(loadInvoiceTaxes());

        const invoice = allInvoices.find(c => c.id === parseInt(invoiceId));
        if (!invoice) return;
        setdata({
            ...invoice,
            contactId: invoice.contact.id       
        });
      }, [allInvoices, invoiceTaxes, invoiceId, dispatch]);

    const onPrint = () => {
        window.print();
    }

    if (count <= 0 || !data) return <Spinner showText={false} />;
    if (count >= 1 && !allInvoices.find(c => c.id === parseInt(invoiceId))) return <Redirect to="/not-found" />;

    return (
        <>
            <div className="row print-title">
                <div className="col-8">
                    <h1 className="pb-3 pt-1">{"Invoice #" + invoiceId}</h1>
                </div>
                <div className="col-4">
                    <h4 className={data.status === "PUBLISHED" ? "pb-3 pt-4 text-right text-success no-print" : "pb-3 pt-4 text-right"}>
                        {data.status.charAt(0).toUpperCase() + data.status.substr(1).toLowerCase()}
                    </h4>
                </div>
            </div>
            
            <InvoiceViewHeader
                data={data}
            />
            <InvoiceViewBody
                data={data.invoiceItems}
                invoiceTaxes={invoiceTaxes}
            />
            <InvoiceTotal 
                data={data.invoiceItems}
                taxInclusive={data.taxInclusive}
            />
            <InvoiceViewFooter
                data={data}
            />
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary mt-2 mb-5 mr-2 no-print" onClick={() => onPrint()}>Print</button>
                    <Link to="/invoices/" className="btn btn-secondary mt-2 mb-5 no-print">Return to Invoices</Link>
                </div>
            </div>
        </>
    );
}

export default InvoicesView;