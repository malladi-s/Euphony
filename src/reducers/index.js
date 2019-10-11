import { combineReducers } from 'redux';
import AlbumsReducer from '../reducers/albums';
import AuthenticationReducer from '../reducers/authentication';
import ErrorReducer from '../reducers/error';
import LoaderReducer from '../reducers/loader';

const reducers = {
    albums: AlbumsReducer,
    authentication: AuthenticationReducer,
    error: ErrorReducer,
    loader: LoaderReducer,
};

export default combineReducers(reducers);