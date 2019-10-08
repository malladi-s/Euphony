import { incrementLoader, decrementLoader } from './loader';

export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
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