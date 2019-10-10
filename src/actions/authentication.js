import 'whatwg-fetch';

import { incrementLoader, decrementLoader } from './loader';
import { clearError } from './error';

export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const passwordResetClear = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_CLEAR' });
export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetHashFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE', error });
export const passwordSaveClear = () => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_CLEAR' });
export const registrationFailure = error => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE', error });
export const registrationSuccess = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS' });
export const registrationSuccessViewed = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED' });
export const passwordSaveFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_FAILURE', error });
export const passwordSaveSuccess = () => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_SUCCESS' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

export function logUserOut() {
    return async (dispatch) => {
        dispatch(incrementLoader());

        await fetch(
            '/api/authentication/logout',
            {
                method: 'GET',
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                dispatch(logoutSuccess());
            }
            dispatch(logoutFailure(new Error(response.status)));
        }).catch((error) => {
            dispatch(logoutFailure(new Error(error)));
        });

        dispatch(decrementLoader());
    }
}


export function logUserIn(userData) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        dispatch(incrementLoader());

        dispatch(loginAttempt());

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
                dispatch(loginSuccess(json));
            } else {
                dispatch(loginFailure(new Error('Email or Password Incorrect. Please Try again.')));
            }
        }).catch((error) => {
            dispatch(loginFailure(new Error(error)));
        });

        return dispatch(decrementLoader());
    }
}

export function checkSession() {
    return async (dispatch) => {
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
                return dispatch(sessionCheckSuccess(json));
            }
            return dispatch(sessionCheckFailure());

        }).catch((error) => (dispatch(sessionCheckFailure(error))));
    }
}

export function registerUser(userData) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        dispatch(incrementLoader());

        await fetch(
            '/api/authentication/register',
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
        }).then(async (json) => {
            if (json && json.username) {
                await dispatch(loginSuccess(json));
                await dispatch(registrationSuccess());
            } else {
                dispatch(registrationFailure(new Error(json.error.message ? 'Email or username already exists' : json.error)));
            }
        }).catch((error) => {
            dispatch(registrationFailure(new Error(error.message || 'Registration Failed. Please try again.')));
        });

        return dispatch(decrementLoader());
    };
}

export function createHash(email) {
    return async (dispatch) => {

        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        await fetch(
            '/api/authentication/saveresethash',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify({ email }),
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
            if (json.success) {
                return dispatch(passwordResetHashCreated(json));
            }
            return dispatch(passwordResetHashFailure(new Error('Something went wrong. Please try again.')));
        }).catch(error => dispatch(passwordResetHashFailure(error)));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}

export function savePassword(data) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/savepassword',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then(async (json) => {
                if (json && json.success) {
                    dispatch(passwordSaveSuccess());
                } else {
                    dispatch(passwordSaveFailure(new Error(json.error.message ? 'There was an error saving the password. Please try again' : json.error)));
                }
            })
            .catch((error) => {
                dispatch(passwordSaveFailure(new Error(error.message || 'There was an error saving the password. Please try again.')));
            });

        // turn off spinner
        return dispatch(decrementLoader());
    };
} 