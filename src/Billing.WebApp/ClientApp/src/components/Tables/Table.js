import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, columns, sortColumn, onSort }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody data={data} columns={columns} />
            </table>
        </div>
    );
}

export default Table;