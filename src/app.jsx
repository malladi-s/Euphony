import 'whatwg-fetch';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/shared/HeaderContainer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/account/LoginPageContainer';
import ProfilePage from './components/account/ProfilePage';
import { sessionCheckFailure, sessionCheckSuccess } from './actions/authentication';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.checkSession = this.checkSession.bind(this);
    }

    // TODO : Replace with componentDidMount
    UNSAFE_componentWillMount() {
        // Before the component mounts, check for an existing user session
        this.checkSession();
    }

    async checkSession() {
        const { sessionCheckFailureAction, sessionCheckSuccessAction } = this.props;

        await fetch(
            '/api/authentication/checksession',
            {
                method: 'GET',
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (json.username) {
                sessionCheckSuccessAction(json);
            } else {
                sessionCheckFailureAction();
            }
        }).catch((error) => {
            sessionCheckFailureAction(error);
        });
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sessionCheckFailureAction: sessionCheckFailure,
        sessionCheckSuccessAction: sessionCheckSuccess,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);