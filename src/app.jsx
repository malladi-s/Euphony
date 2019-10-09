import 'whatwg-fetch';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/shared/HeaderContainer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/account/LoginPageContainer';
import ProfilePage from './components/account/ProfilePage';
import RegisterPage from './components/account/RegisterPageContainer';
import RegistrationSuccessPage from './components/account/RegistrationSuccessPageContainer';

import { checkSession } from './actions/authentication';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.checkUserSession = this.checkUserSession.bind(this);
    }

    // TODO : Replace with componentDidMount
    UNSAFE_componentWillMount() {
        // Before the component mounts, check for an existing user session
        this.checkUserSession();
    }

    checkUserSession() {
        this.props.dispatch(checkSession());
    }

    render() {
        const { authentication, loader } = this.props;
        return (
            <Router>
                <div className="wrapper">
                    <Header username="anonymous" authentication={authentication} />
                    <section className="page-content container-fluid">
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/account/login" component={LoginPage} />
                        <Route exact path="/account/register" component={RegisterPage} />
                        <Route exact path="/account/registration-success" component={RegistrationSuccessPage} />
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
}

function mapStateToProps(state) {
    return {
        loader: state.loader,
        authentication: state.authentication
    }
}

export default connect(mapStateToProps)(App);