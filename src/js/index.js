import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import App from './components/App';

import '../scss/app.scss';
import '../vendor/font-awesome/css/font-awesome.css';

let store = createStore(appReducer, {});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
