import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import axios from 'axios'

import Routes from '../Route';
import {store} from "../store";
import { allSagas } from '../store/sagas'


const axiosInstance = axios.create({
    baseURL: '/api', // get '/api/user' for request

})

// store.runSaga(allSagas.bathroomSaga, {url: 'http://react-ssr-api.herokuapp.com/users'})

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