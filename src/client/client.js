import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import { makeServer } from "../server/mockServer";
import Routes from '../Route';
import configureStore from "../store";
import {allSagas} from '../store/sagas'

if (process.env.NODE_ENV === "development") {
    // makeServer({ environment: "development" })
}

const store = configureStore();

store.runSaga(allSagas.clientRootSaga, {})

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
    <HelmetProvider>
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(Routes)}
            </BrowserRouter>
        </Provider>
    </HelmetProvider>
,
document.querySelector('#root'));