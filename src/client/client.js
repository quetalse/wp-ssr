import '@babel/polyfill';
import axios from 'axios'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';

import Routes from '../Route';
import configureStore from "../store";
import {allSagas} from '../store/sagas'

const axiosInstance = axios.create({
    baseURL: '/api', // get '/api/user' for request
})

const store = configureStore();

store.runSaga(allSagas.clientBathroomsSaga, {})
store.runSaga(allSagas.clientBathroomSaga, {})

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
    <HelmetProvider>
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>
    </HelmetProvider>,
document.querySelector('#root'));