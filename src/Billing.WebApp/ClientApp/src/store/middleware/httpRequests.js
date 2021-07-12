import axios from 'axios';
import config from '../../config.json';
import http from '../http';

const request = ({ dispatch }) => next => async action => {
    if (action.type !== http.requestStarted.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const token = localStorage.getItem('token');

        if (token !== undefined) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };
        }

        const response = await axios.request({
            baseURL: config.baseURL, 
            url,
            method,
            data
        });
        // General success message
        dispatch(http.requestSuccess(response.data));
        // Specific success response
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        let errorMessage = "Request failed, try again";
        if (error.response.status === 401) errorMessage = "Authorization failed";
        // General error response
        dispatch(http.requestFailed(errorMessage));
        // Specific error response
        if (onError) dispatch({ type: onError, payload: errorMessage });
    }
};

export default request;