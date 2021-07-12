import { createAction } from '@reduxjs/toolkit';

export const requestStarted = createAction("http/requestStarted");
export const requestSuccess = createAction("http/requestSuccess");
export const requestFailed = createAction("http/requestFailed");

export default {
    requestStarted,
    requestSuccess,
    requestFailed
};