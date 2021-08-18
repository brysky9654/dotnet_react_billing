import React from 'react';
import TableHeader from '../Tables/TableHeader';

const InvoiceViewBody = ({ data, invoiceTaxes, keyProp }) => {
    const columns = [
        { path: 'description', name: 'Description' },
        { path: 'quantity', name: 'Quantity' },
        { key: 'price', name: 'Price', content: item => "$" + item.price },
        { key: 'taxAmount', name: 'Tax Amount', content: item => item.taxAmount + "%" },
        { key: 'invoiceTax', name: 'Tax Type', content: item => renderInvoiceTax(item) },
    ];

    const renderInvoiceTax = item => {
        const taxId = item.invoiceTaxId ? item.invoiceTaxId : invoiceTaxes.length > 0 ? invoiceTaxes[0].id : "";
        let invoiceTax = {name: ""};
        if (invoiceTaxes.length > 0) invoiceTax = invoiceTaxes.find(t => t.id === taxId); 
        return invoiceTax.name;
    }

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);

        return item[column.path];
    }
    
    return (
        <div className="row invoice-form-body">
            <div className="col">
                <div className="table-responsive">
                    <table className="table">
                        <TableHeader columns={columns} />
                        <tbody className="repeatable-field">
                            {data.map(item => (
                                <tr key={item[keyProp]}>
                                    {columns.map(column => (
                                        <td key={item[keyProp] + (column.path || column.key)}>
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

InvoiceViewBody.defaultProps = {
    keyProp: 'id'
}

export default InvoiceViewBody;