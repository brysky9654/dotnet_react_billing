import { createSlice } from '@reduxjs/toolkit';
import { requestStarted } from './http';
// import { createSelector } from 'reselect';

const slice = createSlice({
    name: 'contacts',
    initialState: {
        data: [],
        loading: false,
        error: null,
        lastFetch: null
    },
    reducers: {
        contactsRequestStarted: (state, action) => {
            state.loading = true;
            state.lastFetch = Date.now();
        },
        contactsReceived: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        contactsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        contactsUpdateStarted: (state, action) => {
            state.loading = true;
        },
        contactsUpdateComplete: (state, action) => {
            const index = state.data.findIndex(d => d.id === action.payload.id);
            state.data[index] = action.payload;
            state.loading = false;
        },
        contactsCreateComplete: (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
        },
        contactsDeleteComplete: (state, action) => {
            state.data = state.data.filter(d => d.id !== action.payload.id);
            state.loading = false;
        }
    }
});

const { 
    contactsRequestStarted,
    contactsReceived, 
    contactsRequestFailed,
    contactsUpdateStarted,
    contactsUpdateComplete,
    contactsCreateComplete,
    contactsDeleteComplete
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "contact";

export const loadContacts = () => (dispatch, getState) => {

    // Basic caching to avoid getting data again too soon
    const { lastFetch } = getState().entities.contacts;
    var difference = (Date.now() - lastFetch) / 1000;

    if (difference < 5) return;

    dispatch(
        requestStarted({
            url,
            onStart: contactsRequestStarted.type,
            onSuccess: contactsReceived.type,
            onError: contactsRequestFailed.type
        })
    );
};

export const createContact = (data) => requestStarted({
    url,
    method: 'post',
    data: {
        firstName: data.firstName,
        lastName: data.lastName,
        businessName: data.businessName,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        favourited: false
    },
    onStart: contactsUpdateStarted.type,
    onSuccess: contactsCreateComplete.type,
    onError: contactsRequestFailed.type    
});

export const updateContact = (data) => requestStarted({
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
    onStart: contactsUpdateStarted.type,
    onSuccess: contactsUpdateComplete.type,
    onError: contactsRequestFailed.type    
});

export const deleteContact = (id) => requestStarted({
    url: url + '/' + id,
    method: 'delete',
    onStart: contactsUpdateStarted.type,
    onSuccess: contactsDeleteComplete.type,
    onError: contactsRequestFailed.type    
});

// Selectors
// export const getContactById = id => createSelector(
//     state => state.entities.contacts,
//     contacts => contacts.filter(contact => contact.id === id)
// );

// export const getContactById = id => {
//     return createSelector(
//         state => state.entities.contacts,
//         contacts => contacts.data.filter(contact => contact.id === id)
//     )
// };