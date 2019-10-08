import { combineReducers, createStore } from 'redux';

import loaderReducer from '../reducers/loader';
import authenticationReducer from '../reducers/authentication';

const combinedReducers = combineReducers({
  loader: loaderReducer,
  authentication: authenticationReducer
});

const Store = createStore(combinedReducers);

export default Store;