import React from 'react';

const TableBody = ({ data, columns, keyProp }) => {
    
    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return item[column.path];
    }

    return (
        <tbody>
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
    );
}

TableBody.defaultProps = {
    keyProp: 'id'
}

export default TableBody;