import 'whatwg-fetch';

import { incrementLoader, decrementLoader } from './loader';

export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const registrationFailure = () => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE' });
export const registrationSuccess = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS' });
export const registrationSuccessViewed = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED' });
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
                return dispatch(logoutSuccess());
            }
            return dispatch(logoutFailure(`Error: ${response.status}`));
        }).catch((error) => {
            dispatch(logoutFailure(error));
        });

        dispatch(decrementLoader());
    }
}


export function logUserIn(userData) {
    return async (dispatch) => {
        dispatch(incrementLoader());

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
                dispatch(loginFailure(new Error('Authentication Failed')));
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
      )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(async (json) => {
        if (json) {
          await dispatch(loginSuccess(json));
          await dispatch(registrationSuccess());
        } else {
          dispatch(registrationFailure(new Error('Registration Failed')));
        }
      })
      .catch((error) => {
        dispatch(registrationFailure(new Error(error)));
      });

      return dispatch(decrementLoader());
    };
  }