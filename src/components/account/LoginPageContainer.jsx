import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { logUserIn } from '../../actions/authentication';

import LoginPage from './LoginPage';

export class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.logUserInFunction = this.logUserInFunction.bind(this);
    }

    logUserInFunction(userData) {
        this.props.dispatch(logUserIn(userData));
    }

    render() {
        const { authentication } = this.props;

        if (authentication.isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }
        return (
            <div>
                <LoginPage loginFunction={this.logUserInFunction} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(LoginPageContainer);