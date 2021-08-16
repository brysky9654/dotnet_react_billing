import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadInvoiceTaxes } from "../../store/invoiceTaxes";
import TableHeader from '../Tables/TableHeader';
import RepeatableField from '../Forms/RepeatableField';
import SelectInputBasic from '../Forms/SelectInputBasic';

const InvoiceItemsForm = ({ data, path, errors, onChange, onAddRepeatable }) => {
    const dispatch = useDispatch();
    const invoiceTaxes = useSelector(state => state.entities.invoiceTaxes.data);
    const columns = [
        { path: 'description', name: 'Description', inputType: 'text', options: [] },
        { path: 'quantity', name: 'Quantity', inputType: 'number', options: [] },
        { path: 'price', name: 'Price', inputType: 'number', options: [] },
        { key: 'invoiceTax', name: 'Tax Type', content: item => renderInvoiceTaxes(item) },
        { key: 'delete', content: item => <button onClick={() => handleDelete(item)} className="btn btn-danger btn-sm float-right">X</button> }
    ];

    useEffect(() => {
        dispatch(loadInvoiceTaxes());
    }, [invoiceTaxes, dispatch]);

    const handleChange = (e, item) => {
        let formInput = JSON.parse(JSON.stringify(data));
        const index = formInput.findIndex(i => i.id === item.id);
        formInput[index] = { ...formInput[index] };
        formInput[index][e.target.name] = e.target.value;

        if (e.target.name === 'invoiceTaxId') {
            const invoiceTax = invoiceTaxes.find(t => t.id === parseInt(e.target.value));
            invoiceTax
                ? formInput[index].taxAmount = invoiceTax.amount
                : formInput[index].taxAmount = 0;
        }

        onChange({target: {name: path, value: formInput}});
    }

    const renderInvoiceTaxes = item => {
        return <SelectInputBasic
                    name="invoiceTaxId"
                    items={[...invoiceTaxes]}
                    error={errors.invoiceTaxes}
                    value={item.invoiceTaxId}
                    onChange={e => handleChange(e, item)}

                />
    }

    const handleDelete = item => {
        if(window.confirm('Are you sure you want to delete this row?')) {
            let formInput = JSON.parse(JSON.stringify(data));
            onChange({target: {name: path, value: formInput.filter(i => i.id !== item.id)}});
        }
    };

    return (
        <div className="row invoice-form-body">
            <div className="col">
                <div className="table-responsive">
                    <table className="table">
                        <TableHeader columns={columns} />
                        <RepeatableField
                            data={data}
                            columns={columns}
                            errors={errors}
                            keyProp="order"
                            editable={true}
                            onChange={handleChange}
                            onAddRepeatable={onAddRepeatable}
                        />
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InvoiceItemsForm;