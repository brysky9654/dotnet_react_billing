import React, { useEffect } from "react";
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { authCheck } from './store/auth';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import RegisterForm from './components/RegisterForm';
import ContactsForm from './components/ContactsForm';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Invoices from './pages/Invoices';
import './custom.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  return (
    <Layout>
        <Route exact path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={RegisterForm} exact />
        <Route path='/contacts/:id' component={ContactsForm} exact />
        <Route path='/contacts' component={Contacts} exact />
        <Route path='/invoices' component={Invoices} exact />
    </Layout>
  );
}

export default App;