import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import Routes from './Route';
import {store} from "./store";
import '@babel/polyfill';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {renderRoutes(Routes)}
            </div>
        </BrowserRouter>
    </Provider>,
document.querySelector('#root'));