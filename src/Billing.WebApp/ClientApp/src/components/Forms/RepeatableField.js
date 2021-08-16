import React from 'react';
import Input from './Input';
import SelectInputBasic from './SelectInputBasic';
import PlusIcon from '../../assets/icons/plus.svg';

const RepeatableField = ({ data, columns, keyProp, editable, onChange, onAddRepeatable }) => {

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);

        const content = editable 
                ? column.inputType === 'select'
                    ? <SelectInputBasic
                            name={column.path}
                            items={column.options}
                            value={item[column.path]}
                            path={column.path}
                            label=""
                            onChange={e => onChange(e, item)}
                        />
                    : <Input
                        name={column.path}
                        value={item[column.path]}
                        inputType={column.inputType}
                        label=""
                        onChange={e => onChange(e, item)}
                    />
                : item[column.path];

        return content;
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
    keyProp: 'id',
    editable: false
}

export default RepeatableField;