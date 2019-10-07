import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import HomePage from './components/home/HomePage';
import LoginPage from './components/account/LoginPage';
import ProfilePage from './components/account/ProfilePage';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.scss'

render(
    <div className="wrapper">
        <Router>
            <Header username="anonymous" />
            <section className="page-content container-fluid">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/account/login" component={LoginPage} />
                <Route path="/account/profile/:id" component={ProfilePage} />
            </section>
        </Router>
    </div>,
    document.querySelector("#react-app")
);