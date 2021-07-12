import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import authRequests from './middleware/authRequests';
import httpRequests from './middleware/httpRequests';

export default function() {
    return configureStore({ 
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            authRequests,
            httpRequests
        ] 
    });
}