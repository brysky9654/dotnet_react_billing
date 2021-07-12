import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pages = Array.from({length: Math.ceil(itemsCount / pageSize)}, (_, i) => i + 1);
    if (pages.length <= 1) return null;
    
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={ page === currentPage ? "page-item active" : "page-item"}>
                        <span className="page-link" onClick={() => onPageChange(page)}>{page}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;