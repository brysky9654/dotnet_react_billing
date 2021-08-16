import React from 'react';

const InvoiceTotal = ({ data, taxInclusive }) => {

    const calculateSubTotal = () => {
        let total = 0;

        data.forEach(d => {
            const taxAmount = (parseInt(d.quantity) * parseFloat(d.price)) * parseInt(d.taxAmount) / 100;
            taxInclusive
                ? total = total + (parseInt(d.quantity) * parseFloat(d.price)) - taxAmount
                : total = total + (parseInt(d.quantity) * parseFloat(d.price));
        });

        return total;
    }

    const calculateTaxTotal = () => {
        let total = 0;

        data.forEach(d => {
            const taxPercent = parseInt(d.taxAmount) / 100;
            if (taxPercent !== 0) total = total + ((parseInt(d.quantity) * (parseFloat(d.price)) * taxPercent));
        });

        return total;
    }

    const calculateTotal = () => {
        return calculateSubTotal() + calculateTaxTotal(); 
    }

    return (
        <div className="container">
            <div className="row invoice-total">
                <div className="col-8">

                </div>
                <div className="col-2 text-right">
                    <h5 className="font-weight-normal">Subtotal:</h5>
                    <h5 className="font-weight-normal">Tax:</h5>
                    <h3>Total:</h3>
                </div>
                <div className="col-2 text-right">
                    <h5 className="font-weight-normal">${parseFloat(calculateSubTotal()).toFixed(2)}</h5>
                    <h5 className="font-weight-normal">${parseFloat(calculateTaxTotal()).toFixed(2)}</h5>
                    <h3>${parseFloat(calculateTotal()).toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
}

export default InvoiceTotal;