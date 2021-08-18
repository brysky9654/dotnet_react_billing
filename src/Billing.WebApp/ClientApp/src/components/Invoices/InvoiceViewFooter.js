import React from 'react';

const InvoiceViewFooter = ({ data }) => {

    return (
        <div className="row invoice-form-footer">
            <div className="col mb-3">
                { data.notes ?
                <>
                    <p>Notes:</p>
                    {data.notes}
                </>
                : null}
                { data.paid ?
                    <div className="alert pt-3 pb-1">
                        <p>Paid on:</p>
                        {new Date(data.paid).toLocaleDateString("en-GB")}
                    </div>
                : null}
            </div>
        </div>
    );
}

export default InvoiceViewFooter;