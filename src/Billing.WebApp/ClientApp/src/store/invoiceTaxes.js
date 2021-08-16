import { createSlice } from '@reduxjs/toolkit';
import { requestStarted } from './http';

const slice = createSlice({
    name: 'invoiceTaxes',
    initialState: {
        data: [],
        loading: false,
        error: null,
        lastFetch: null
    },
    reducers: {
        invoiceTaxesRequestStarted: (state, action) => {
            state.loading = true;
            state.lastFetch = Date.now();
        },
        invoiceTaxesReceived: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        invoiceTaxesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        invoiceTaxesUpdateStarted: (state, action) => {
            console.log(action);
            state.loading = true;
        },
        invoiceTaxesUpdateComplete: (state, action) => {
            const index = state.data.findIndex(d => d.id === action.payload.id);
            state.data[index] = action.payload;
            state.loading = false;
        },
        invoiceTaxesCreateComplete: (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
        },
        invoiceTaxesDeleteComplete: (state, action) => {
            state.data = state.data.filter(d => d.id !== action.payload.id);
            state.loading = false;
        }
    }
});

const { 
    invoiceTaxesRequestStarted,
    invoiceTaxesReceived, 
    invoiceTaxesRequestFailed,
    invoiceTaxesUpdateStarted,
    invoiceTaxesUpdateComplete,
    invoiceTaxesCreateComplete,
    invoiceTaxesDeleteComplete
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "invoicetax";

export const loadInvoiceTaxes = () => (dispatch, getState) => {

    // Basic caching to avoid getting data again too soon
    const { lastFetch } = getState().entities.invoiceTaxes;
    var difference = (Date.now() - lastFetch) / 1000;

    if (difference < 5) return;

    dispatch(
        requestStarted({
            url,
            onStart: invoiceTaxesRequestStarted.type,
            onSuccess: invoiceTaxesReceived.type,
            onError: invoiceTaxesRequestFailed.type
        })
    );
};

export const createInvoiceTax = (data) => requestStarted({
    url,
    method: 'post',
    data: {
        name: data.name,
        amount: data.amount,
        percentage: data.percentage
    },
    onStart: invoiceTaxesUpdateStarted.type,
    onSuccess: invoiceTaxesCreateComplete.type,
    onError: invoiceTaxesRequestFailed.type    
});

export const updateInvoiceTax = (data) => requestStarted({
    url: url + '/' + data.id,
    method: 'put',
    data: {
        name: data.name,
        amount: data.amount,
        percentage: data.percentage
    },
    onStart: invoiceTaxesUpdateStarted.type,
    onSuccess: invoiceTaxesUpdateComplete.type,
    onError: invoiceTaxesRequestFailed.type    
});

export const deleteInvoiceTax = (id) => requestStarted({
    url: url + '/' + id,
    method: 'delete',
    onStart: invoiceTaxesUpdateStarted.type,
    onSuccess: invoiceTaxesDeleteComplete.type,
    onError: invoiceTaxesRequestFailed.type    
});