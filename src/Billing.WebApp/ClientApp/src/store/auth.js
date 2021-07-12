import { createSlice, createAction } from '@reduxjs/toolkit';
import { requestStarted } from './http';
import jwtDecode from 'jwt-decode';

const slice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: [],
        admin: false,
        error: null,
        loading: false,
        lastFetch: null
    },
    reducers: {
        authStart: (state, action) => {
            state.error = null;
            state.loading = true;
            state.lastFetch = Date.now();
        },
        authSuccess: (state, action) => {
            const token = action.payload.token;
            const tokenDecoded = jwtDecode(token);
            let adminStatus = false;
            if (tokenDecoded.role.indexOf("Admin") > -1) adminStatus = true;
            state.token = token;
            state.user = tokenDecoded;
            state.admin = adminStatus;
            state.error = null;
            state.loading = false;
            
            const expirationDate = new Date(new Date().getTime() + 86400000 * 28);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
        },
        authFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        authLogout: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            state.token = null;
        },
        authRestoreStart: (state, action) => {
            state.error = null;
            state.loading = true;
            state.lastFetch = Date.now();
        },
        authRestoreSuccess: (state, action) => {
            const token = action.payload;
            const tokenDecoded = jwtDecode(token);
            let adminStatus = false;
            if (tokenDecoded.role.indexOf("Admin") > -1) adminStatus = true;
            state.token = token;
            state.user = tokenDecoded;
            state.admin = adminStatus;
            state.error = null;
            state.loading = false;
        },
        authRestoreFail: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            state.token = null;
            state.error = null;
            state.loading = false;
        },
        authClearError: (state, action) => {
            state.error = null;
        }
    }
});

const { 
    authStart,
    authSuccess,
    authFail, 
    authLogout,
    authRestoreStart,
    authRestoreSuccess,
    authRestoreFail,
} = slice.actions;
export default slice.reducer;

const url = "account";

export const authLogin = (data) => requestStarted({
    url: url + '/login',
    method: 'post',
    data: {
        username: data.username,
        password: data.password
    },
    onStart: authStart.type,
    onSuccess: authSuccess.type,
    onError: authFail.type    
});

export const logout = () => (dispatch, getState) => {
    dispatch({ type: authLogout.type });
};

export const requestAuthRestore = createAction("auth/requestAuthRestore");

export const authCheck = () => requestAuthRestore({
    onStart: authRestoreStart.type,
    onSuccess: authRestoreSuccess.type,
    onError: authRestoreFail.type 
});
