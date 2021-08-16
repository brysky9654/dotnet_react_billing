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

                    />
                </div>
            </div>
        </div>
    );
}

export default InvoiceFormFooter;