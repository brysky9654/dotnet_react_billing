import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ContactsForm from './components/ContactsForm';
import Contacts from './pages/Contacts';
import Invoices from './pages/Invoices';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} exact />
        <Route path='/login' component={LoginForm} exact />
        <Route path='/register' component={RegisterForm} exact />
        <Route path='/contacts/:id' component={ContactsForm} exact />
        <Route path='/contacts' component={Contacts} exact />
        <Route path='/invoices' component={Invoices} exact />
      </Layout>
    );
  }
}
