import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadContacts } from "../../store/contacts";

const InvoiceViewHeader = ({ data }) => {
    const dispatch = useDispatch();
    const allContacts = useSelector(state => state.entities.contacts.data);

    useEffect(() => {
        dispatch(loadContacts());
        
      }, [allContacts, dispatch]);

    const handleContactLabel = () => {
        const updatedContact = allContacts.find(c => c.id === data.contactId);
        if (!updatedContact) return 'Loading...';
        return <div>
                    <div className="d-block">{updatedContact.businessName}</div>
                    <div className="d-block">{updatedContact.firstName} {updatedContact.lastName}</div>
                </div>
    }

    const contactLabel = handleContactLabel();

    return (
        <div className="row invoice-form-header mb-4">
            <div className="col-3">
                <p>To:</p>
                {contactLabel}
            </div>
            
            <div className="col-2">
                <p>Created:</p>
                {new Date(data.created).toLocaleDateString("en-GB")}
            </div>
            <div className="col-2">
                <p>Due:</p>
                {new Date(data.due).toLocaleDateString("en-GB")}
            </div>
            <div className="col-3">
                <p>Reference:</p>
                {data.reference}
            </div>
            <div className="col-2">
                <p>Tax Inclusive:</p>
                {data.taxInclusive = 1 ? "Yes" : "No"}
            </div>
        </div>
    );
}

export default InvoiceViewHeader;