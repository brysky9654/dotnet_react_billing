import React from 'react';
import TableHeader from '../Tables/TableHeader';
import RepeatableField from '../Forms/RepeatableField';

const InvoiceItemsForm = ({ data, onDelete, onAddRepeatable }) => {
    const columns = [
        { path: 'description', name: 'Description' },
        { path: 'quantity', name: 'Quantity' },
        { path: 'price', name: 'Price' },
        { path: 'taxAmount', name: 'Tax Amount' },
        { path: 'taxInclusive', name: 'Tax Inclusive' },
        { key: 'delete', content: invoice => <button onClick={() => onDelete(invoice)} className="btn btn-danger btn-sm">X</button> }
    ];

    return (
        <div className=" table-responsive">
            <table className="table">
                <TableHeader columns={columns} />
                <RepeatableField
                    id={data.id}
                    data={data.invoiceItems}
                    columns={columns}
                    onAddRepeatable={onAddRepeatable}
                    onDelete={onDelete}
                />
            </table>
        </div>
    );
}

export default InvoiceItemsForm;