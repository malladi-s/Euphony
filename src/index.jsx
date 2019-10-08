import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.scss';

import Store from './store';

const renderApp = () => ( 
    <Provider store={Store}>
        <App /> 
    </Provider>
);

render(
    renderApp(),
    document.querySelector("#react-app")
);