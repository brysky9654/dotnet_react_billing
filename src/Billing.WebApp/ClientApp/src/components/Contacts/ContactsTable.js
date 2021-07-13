import React from 'react';
import { Link } from 'react-router-dom';
import Favourite from '../Tables/Favourite';
import Table from '../Tables/Table';

const ContactsTable = ({ contacts, sortColumn, onFavourite, onDelete, onSort }) => {
    const columns = [
        { path: 'firstName', name: 'First Name' },
        { path: 'lastName', name: 'Last Name' },
        { path: 'businessName', name: 'Business' },
        { path: 'email', name: 'Email'},
        // { path: 'address', name: 'Address' },
        // { path: 'city', name: 'City' },
        // { path: 'state', name: 'State' },
        // { path: 'country', name: 'Country' },
        { key: 'favourite', content: contact => <Favourite favourited={contact.favourited} onClick={() => onFavourite(contact)} /> },
        { key: 'edit', content: contact => <Link to={"/contacts/" + contact.id} className="btn btn-warning btn-sm">Edit</Link> },
        { key: 'delete', content: contact => <button onClick={() => onDelete(contact)} className="btn btn-danger btn-sm">Delete</button> }
    ];

    return (
        <Table 
            data={contacts}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
}

export default ContactsTable;