import { requestAuthRestore } from '../auth';

const request = ({ dispatch }) => next => async action => {
    if (action.type !== requestAuthRestore.type) return next(action);

    const { onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (token === undefined || expirationDate <= new Date()) {
        if (onError) dispatch({ type: onError, payload: "User not logged in" });
    } else {
        if (onSuccess) dispatch({ type: onSuccess, payload: token });
    }
};

export default request;