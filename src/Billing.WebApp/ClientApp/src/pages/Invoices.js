import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices, deleteInvoice, updateInvoice } from "../store/invoices";
import InvoicesTable from '../components/Invoices/InvoicesTable';
import Pagination from '../components/Tables/Pagination';
import ListGroup from '../components/Tables/ListGroup';
import SearchBox from '../components/Tables/SearchBox';
import Spinner from '../components/Spinner/Spinner';
import { paginate } from '../utils/paginate';
import PlusIcon from '../assets/icons/plus.svg';

const Invoices = () => {
    const dispatch = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);

    const [pageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortColumn, setSortColumn] = useState({ path: 'firstName', order: 'asc'});
    const [searchQuery, setSearchQuery] = useState("");

    const [tags] = useState([
        { id: '', name: "All Invoices", value: null },
        { id: 1, name: "Draft", value: "DRAFT" },
        { id: 2, name: "Published", value: "PUBLISHED" },
        { id: 3, name: "Unpaid", value: "PUBLISHED" },
        { id: 4, name: "Paid", value: "PUBLISHED" },
        { id: 5, name: "Reversed", value: "REVERSED" }

    ]);

    const [invoices, setInvoices] = useState(allInvoices);

    useEffect(() => {
        dispatch(loadInvoices());
        setInvoices(allInvoices);
    }, [allInvoices, dispatch]);

    const handleDelete = invoice => {
        if(window.confirm('Are you sure you want to delete this invoice?')) {
            dispatch(deleteInvoice(invoice.id));
            setInvoices(invoices.filter(c => c.id !== invoice.id));
        }
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

        let filtered = [...invoices];

        if (searchQuery) {
            filtered = invoices.filter(item => {
                const query = searchQuery.toLowerCase();
                return (
                  item.reference.toLowerCase().indexOf(query) >= 0
                )
              });
        } else if (selectedTag && selectedTag.id) {
            filtered = invoices.filter(t => t.status === selectedTag.value) ;
        }
        
        const sorted = filtered.sort((a, b) => (sortColumn.order === 'asc' ? a[sortColumn.path] > b[sortColumn.path] : b[sortColumn.path] > a[sortColumn.path]) ? 1 : -1)
        
        const invoicesPage = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: invoicesPage };
    }

    if (allInvoices.length <= 0) return <Spinner showText={false} />;

    const { length: count } = invoices;

    if (count === 0) return <p>There are no invoices</p>;

    const { totalCount, data } = getPagedData();

    return (
        <>
            <h1 className="pb-3 pt-1">Invoices</h1>
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
                        <Link to="/invoices/new" className="btn btn-primary mb-2 float-right">
                        <img className="plus-icon-white" src={PlusIcon} alt="Add Invoice" /> Add Invoice
                        </Link>
                    </div>
                    <p>Showing {totalCount} invoices</p>
                    <SearchBox value={searchQuery} placeholder="Search reference..." onChange={handleSearch} />
                    <InvoicesTable
                        invoices={data}
                        sortColumn={sortColumn}
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

export default Invoices;