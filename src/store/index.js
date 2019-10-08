import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import combinedReducers from '../reducers';

const enhancer = compose(applyMiddleware(thunkMiddleware));

export default function configureStore(initialState) {
  return createStore(combinedReducers, initialState, enhancer)
}