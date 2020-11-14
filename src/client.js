import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import Routes from './Route';
import {store} from "./store";



console.log('store', store)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>,
document.querySelector('#root'));