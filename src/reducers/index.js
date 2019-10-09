import { combineReducers } from 'redux';
import AuthenticationReducer from '../reducers/authentication';
import ErrorReducer from '../reducers/error';
import LoaderReducer from '../reducers/loader';

const reducers = {
    authentication: AuthenticationReducer,
    error: ErrorReducer,
    loader: LoaderReducer,
};

export default combineReducers(reducers);