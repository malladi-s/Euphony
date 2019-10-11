import { combineReducers } from 'redux';
import AlbumsReducer from '../reducers/albums';
import ArtistsReducer from '../reducers/artists';
import AuthenticationReducer from '../reducers/authentication';
import ErrorReducer from '../reducers/error';
import ListReducer from '../reducers/list';
import LoaderReducer from '../reducers/loader';
import UserReducer from '../reducers/user';

const reducers = {
    albums: AlbumsReducer,
    artists: ArtistsReducer,
    authentication: AuthenticationReducer,
    error: ErrorReducer,
    list: ListReducer,
    loader: LoaderReducer,
    user: UserReducer,
};

export default combineReducers(reducers);