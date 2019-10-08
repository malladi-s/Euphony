import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementLoader, decrementLoader } from '../../actions/loader';
import { loginAttempt, loginSuccess, loginFailure } from '../../actions/authentication';

import LoginPage from './LoginPage';

export class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };

        this.attemptLogIn = this.attemptLogIn.bind(this);
    }

    async attemptLogIn(userData) {
        const {
            decrementLoaderAction,
            incrementLoaderAction,
            loginAttemptAction,
            loginFailureAction,
            loginSuccessAction
        } = this.props;

        // turn on spinner
        incrementLoaderAction();

        // contact login API
        await fetch(
            '/api/authentication/login',
            {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (json) {
                loginSuccessAction(json);
                this.setState({ redirect: true });
            } else {
                loginFailureAction(new Error('Authentication Failed'));
            }
        }).catch((error) => {
            loginFailureAction(new Error(error));
        });


        // turn off spinner
        decrementLoaderAction();
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return (
                <Redirect to="/" />
            );
        }
        return (
            <div>
                <LoginPage loginFunction={this.attemptLogIn} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        incrementLoaderAction: incrementLoader,
        decrementLoaderAction: decrementLoader,
        loginAttemptAction: loginAttempt,
        loginFailureAction: loginFailure,
        loginSuccessAction: loginSuccess,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPageContainer);