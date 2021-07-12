import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactsTable from '../components/ContactsTable';
import Pagination from '../components/Tables/Pagination';
import ListGroup from '../components/Tables/ListGroup';
import SearchBox from '../components/Tables/SearchBox';
import { paginate } from '../utils/paginate';
import PlusIcon from '../assets/icons/plus.svg';
import { tagsData, contactsData } from '../test/testData';


const Contacts = () => {
    const [pageSize, setPageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortColumn, setSortColumn] = useState({ path: 'firstName', order: 'asc'});
    const [searchQuery, setSearchQuery] = useState("");

    const [tags, setTags] = useState([{ id: '', name: "All Tags" }, ...tagsData]);

    const [contacts, setContacts] = useState(contactsData);

    const handleDelete = contact => {
        if(window.confirm('Are you sure you want to delete this contact?')) {
            setContacts(contacts.filter(c => c.id !== contact.id));
        }
    };

    const handleFavourite = contact => {
        const contactsData = [...contacts];
        const index = contactsData.indexOf(contact);
        contactsData[index] = {...contactsData[index]};
        contactsData[index].favourited = !contactsData[index].favourited;
        setContacts(contactsData);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    }

    const handleTagSelect = tag => {
        setCurrentPage(1);
        setSearchQuery("");
        setSelectedTag(tag);
    }

    const handleSort = sortData => {
        setSortColumn(sortData);
    }

    const handleSearch = query => {
        setSearchQuery(query);
        setCurrentPage(1);
        setSelectedTag(null);
    }

    const getPagedData = () => {

        let filtered = contacts;

        if (searchQuery) {
            filtered = contacts.filter(item => {
                const query = searchQuery.toLowerCase();
                return (
                  item.firstName.toLowerCase().indexOf(query) >= 0 ||
                  item.lastName.toLowerCase().indexOf(query) >= 0 || 
                  item.businessName.toLowerCase().indexOf(query) >= 0
                )
              });
        } else if (selectedTag && selectedTag.id) {
            filtered = contacts.filter(t => t.state === selectedTag.name) ;
        }
        
        const sorted = filtered.sort((a, b) => (sortColumn.order === 'asc' ? a[sortColumn.path] > b[sortColumn.path] : b[sortColumn.path] > a[sortColumn.path]) ? 1 : -1)
        
        const contactsPage = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: contactsPage };
    }

    const { length: count } = contacts;


    if (count === 0) return <p>There are no contacts</p>;

    const { totalCount, data } = getPagedData();

    return (
        <>
            <h1 className="pb-3 pt-1">Contacts</h1>
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={tags}
                        selectedItem={selectedTag}
                        onItemSelect={handleTagSelect}
                    />
                </div>
                <div className="col">
                    <div className="clearfix">
                        <Link to="/contacts/new" className="btn btn-primary mb-2 float-right">
                        <img className="plus-icon-white" src={PlusIcon} alt="Add Contact" /> Add Contact
                        </Link>
                    </div>
                    <p>Showing {totalCount} contacts</p>
                    <SearchBox value={searchQuery} placeholder="Search name..." onChange={handleSearch} />
                    <ContactsTable
                        contacts={data}
                        sortColumn={sortColumn}
                        onFavourite={handleFavourite}
                        onDelete={handleDelete}
                        onSort={handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div> 
        </>
    );
}

export default Contacts;