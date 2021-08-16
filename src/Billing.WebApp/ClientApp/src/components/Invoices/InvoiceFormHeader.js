import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadContacts } from "../../store/contacts";
import Input from '../Forms/Input';
import SelectInput from '../Forms/SelectInput';
import SelectInputBasic from '../Forms/SelectInputBasic';
import DateInput from '../Forms/DateInput';


const InvoicesFormHeader = ({ data, errors, onChange }) => {
    const dispatch = useDispatch();
    const allContacts = useSelector(state => state.entities.contacts.data);
    const [taxInclusive] = useState([{ name: 'Yes', value: true }, { name: 'No', value: false }]);

    useEffect(() => {
        dispatch(loadContacts());
        
      }, [allContacts, dispatch]);
    
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

    const contactList = handleContactList();
    const contactLabel = handleContactUpdate();

    return (
        <div className="row invoice-form-header">
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
                    onChange={onChange}
                    error={errors.contactId}
                />
            </div>
            
            <div className="col-2">
                <DateInput
                    name="created"
                    value={data.created}
                    label="Date"
                    onChange={onChange}
                    error={errors.created}
                />
            </div>
            <div className="col-2">
                <DateInput
                    name="due"
                    value={data.due}
                    label="Due"
                    onChange={onChange}
                    error={errors.due}
                />
            </div>
            <div className="col-3">
                <Input 
                    name="reference"
                    value={data.reference}
                    label="Reference"
                    onChange={onChange}
                    error={errors.reference}
                />
            </div>
            <div className="col-2">
                <SelectInputBasic
                    name="taxInclusive"
                    items={taxInclusive}
                    value={data.taxInclusive}
                    path="value"
                    label="Tax Inclusive"
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default InvoicesFormHeader;