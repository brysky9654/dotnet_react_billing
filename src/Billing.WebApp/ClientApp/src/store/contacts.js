import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { requestStarted } from './http';

const slice = createSlice({
    name: 'contacts',
    initialState: {
        data: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        contactsRequested: (state, action) => {
            state.loading = true;
            state.lastFetch = Date.now();
        },
        contactsReceived: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        contactsRequestFailed: (state, action) => {
            state.loading = false;
        }
    }
});

const { 
    contactsRequested,
    contactsReceived, 
    contactsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "contact";

export const loadContacts = () => (dispatch, getState) => {

    // Basic caching to avoid getting data again too soon
    const { lastFetch } = getState().entities.users;
    var difference = (Date.now() - lastFetch) / 1000;

    if (difference < 60) return;

    dispatch(
        requestStarted({
            url,
            onStart: contactsRequested.type,
            onSuccess: contactsReceived.type,
            onError: contactsRequestFailed.type
        })
    );
};

// Selectors
export const getContactById = id => createSelector(
    state => state.entities.contacts,
    users => users.filter(contact => contact.id === id)
);