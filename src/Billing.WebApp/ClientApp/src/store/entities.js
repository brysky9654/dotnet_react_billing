import { combineReducers } from 'redux';
import authReducer from './auth';
import contactsReducer from './contacts';
import invoicesReducer from './invoices';


export default combineReducers({
    auth: authReducer,
    contacts: contactsReducer,
    invoices: invoicesReducer
});