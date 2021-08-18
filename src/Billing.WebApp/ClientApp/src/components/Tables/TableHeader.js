import React from 'react';
import SortIcon from './SortIcon';

const TableHeader = ({ columns, sortColumn, onSort }) => {
    
    const raiseSort = path => {
        const sortData = {...sortColumn};
        if (sortData.path === path) {
            sortData.order = (sortData.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortData.path = path;
            sortData.order = 'asc';
        }
        onSort(sortData);
    }

    const renderSortIcon = column => {
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <SortIcon ascending={true} />
        return <SortIcon ascending={false} />
    }

    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th 
                        key={column.path || column.key}
                        onClick={() => sortColumn.path && column.path ? raiseSort(column.path) : null}
                        scope="col"
                        className={column.path ? "sortable-column" : "unsortable-column"}
                    >
                        {column.name}
                        {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

TableHeader.defaultProps = {
    sortColumn: {
        path: null
    },
    onSort: ''
}

export default TableHeader;