import React from 'react';
import PlusIcon from '../../assets/icons/plus.svg';

const RepeatableField = ({ data, columns, keyProp, onAddRepeatable }) => {

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return item[column.path];
    }

    return (
        <>
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
            <tfoot>
                <tr>
                    <td colSpan={columns.length + 1}>
                        <button className="btn btn-sm btn-primary float-right" onClick={e => onAddRepeatable(e)}>
                            <img className="plus-icon-white" src={PlusIcon} alt="Add Row" /> Add Row
                        </button>
                    </td>
                </tr>
            </tfoot>
        </>
    );
}


RepeatableField.defaultProps = {
    keyProp: 'id'
}

export default RepeatableField;