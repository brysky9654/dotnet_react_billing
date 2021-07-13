import React, { useEffect } from "react";
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { authCheck } from './store/auth';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Login from './pages/Login';
import ContactsForm from './components/Contacts/ContactsForm';
import Contacts from './pages/Contacts';
import InvoicesForm from './components/Invoices/InvoicesForm';
import Invoices from './pages/Invoices';
import './custom.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <Layout>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/contacts/:id' component={ContactsForm} exact />
        <Route path='/contacts' component={Contacts} exact />
        <Route path='/invoices/:id' component={InvoicesForm} exact />
        <Route path='/invoices' component={Invoices} exact />
    </Layout>
  );
}

export default App;