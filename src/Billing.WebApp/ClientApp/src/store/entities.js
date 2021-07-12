import { combineReducers } from 'redux';
import authReducer from './auth';
import contactsReducer from './contacts';


export default combineReducers({
    auth: authReducer,
    contacts: contactsReducer
});