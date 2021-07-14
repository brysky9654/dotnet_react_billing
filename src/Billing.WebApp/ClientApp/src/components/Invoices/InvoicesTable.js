import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../Tables/Table';

const InvoicesTable = ({ invoices, sortColumn, onDelete, onSort }) => {
    const columns = [
        { path: 'id', name: 'No.' },
        { path: 'reference', name: 'Ref' },
        { key: 'customer', name: 'Name', content: invoice => invoice.contact.businessName },
        { key: 'price', name: 'Price', content: invoice => "$" + invoice.invoiceItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next).toFixed(2) },
        { key: 'due', name: 'Due', content: invoice => new Date(invoice.due).toLocaleDateString() },
        { key: 'paid', name: 'Paid', content: invoice => invoice.paid ? "Yes" : "No" },
        { path: 'status', name: 'Status' },
        { key: 'edit', content: invoice => <Link to={"/invoices/" + invoice.id} className="btn btn-warning btn-sm">Edit</Link> },
        { key: 'delete', content: invoice => <button onClick={() => onDelete(invoice)} className="btn btn-danger btn-sm">Delete</button> }
    ];

    return (
        <Table 
            data={invoices}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
}

export default InvoicesTable;