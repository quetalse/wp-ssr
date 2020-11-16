import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import Routes from './app/Route';
import {store} from "./app/store";
import rootSaga from './app/store/sagas/client'

store.runSaga(rootSaga)

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>,
document.querySelector('#root'));