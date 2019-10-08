import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import HomePage from './components/home/HomePage';
import LoginPage from './components/account/LoginPageContainer';
import ProfilePage from './components/account/ProfilePage';

const App = (props) => {
    const { authentication, loader } = props;

    return (
        <Router>
            <div className="wrapper">
                <Header username="anonymous" authentication={authentication} />
                <section className="page-content container-fluid">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/account/login" component={LoginPage} />
                    <Route path="/account/profile/:id" component={ProfilePage} />
                </section>
                <div className="loader-wrapper" style={loader > 0 ? { display: 'block' } : { display: 'none' }}>
                    <div className="loader-box">
                        <div className="loader">Loading...</div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

function mapStateToProps(state) {
    return {
        loader: state.loader,
        authentication: state.authentication
    }
}

export default connect(mapStateToProps)(App);