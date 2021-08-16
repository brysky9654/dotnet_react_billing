import { createSlice } from '@reduxjs/toolkit';
import { requestStarted } from './http';

const slice = createSlice({
    name: 'invoices',
    initialState: {
        data: [],
        loading: false,
        error: null,
        lastFetch: null
    },
    reducers: {
        invoicesRequestStarted: (state, action) => {
            state.loading = true;
            state.lastFetch = Date.now();
        },
        invoicesReceived: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        invoicesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        invoicesUpdateStarted: (state, action) => {
            console.log(action);
            state.loading = true;
        },
        invoicesUpdateComplete: (state, action) => {
            const index = state.data.findIndex(d => d.id === action.payload.id);
            state.data[index] = action.payload;
            state.loading = false;
        },
        invoicesCreateComplete: (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
        },
        invoicesDeleteComplete: (state, action) => {
            state.data = state.data.filter(d => d.id !== action.payload.id);
            state.loading = false;
        }
    }
});

const { 
    invoicesRequestStarted,
    invoicesReceived, 
    invoicesRequestFailed,
    invoicesUpdateStarted,
    invoicesUpdateComplete,
    invoicesCreateComplete,
    invoicesDeleteComplete
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "invoice";

export const loadInvoices = () => (dispatch, getState) => {

    // Basic caching to avoid getting data again too soon
    const { lastFetch } = getState().entities.invoices;
    var difference = (Date.now() - lastFetch) / 1000;

    if (difference < 5) return;

    dispatch(
        requestStarted({
            url,
            onStart: invoicesRequestStarted.type,
            onSuccess: invoicesReceived.type,
            onError: invoicesRequestFailed.type
        })
    );
};

export const createInvoice = (data) => requestStarted({
    url,
    method: 'post',
    data: {
        contactId: data.contactId,
        status: data.status,
        notes: data.notes,
        reference: data.reference,
        taxInclusive: data.taxInclusive,
        invoiceItems: data.invoiceItems,
        created: convertStringToDate(data.created),
        due: convertStringToDate(data.due),
        paid: convertStringToDate(data.paid)
    },
    onStart: invoicesUpdateStarted.type,
    onSuccess: invoicesCreateComplete.type,
    onError: invoicesRequestFailed.type    
});

export const updateInvoice = (data) => requestStarted({
    url: url + '/' + data.id,
    method: 'put',
    data: {
        firstName: data.firstName,
        lastName: data.lastName,
        businessName: data.businessName,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        favourited: data.favourited
    },
    onStart: invoicesUpdateStarted.type,
    onSuccess: invoicesUpdateComplete.type,
    onError: invoicesRequestFailed.type    
});

export const deleteInvoice = (id) => requestStarted({
    url: url + '/' + id,
    method: 'delete',
    onStart: invoicesUpdateStarted.type,
    onSuccess: invoicesDeleteComplete.type,
    onError: invoicesRequestFailed.type    
});

// Helper method
const convertStringToDate = dateString => {
    if (dateString !== '') return new Date(dateString).toISOString();
    return null;
}