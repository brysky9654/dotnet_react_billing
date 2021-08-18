import React from 'react';
import Input from '../Forms/Input';
import DateInput from '../Forms/DateInput';

const InvoiceFormFooter = ({ data, errors, onChange }) => {

    return (
        <div className="row invoice-form-footer">
            <div className="col">
                <Input 
                    name="notes"
                    value={data.notes}
                    label="Notes (Optional)"
                    onChange={onChange}
                    error={errors.notes}
                />
                <div className="alert pt-3 pb-1">
                    <DateInput
                        name="paid"
                        value={data.paid}
                        label="Paid On (Optional)"
                        onChange={onChange}
                        error={errors.paid}
                        styles="d-inline-block form-group date-input"
                    />
                    <div className="clear-btn d-inline-block text-secondary ml-2" onClick={value => onChange({target: {name: 'paid', value: ''}})}>Clear</div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceFormFooter;