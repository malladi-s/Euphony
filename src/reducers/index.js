import { combineReducers } from 'redux';
import AuthenticationReducer from '../reducers/authentication';
import LoaderReducer from '../reducers/loader';

const reducers = {
    authentication: AuthenticationReducer,
    loader: LoaderReducer,
};

export default combineReducers(reducers);