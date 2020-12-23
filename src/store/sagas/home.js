import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchHome, failureFetchHome} from '../actions/home';
import { SAGA_FETCH_HOME } from "../types";

const fetchHome = async ({name, url}) => {
    const response = await axios(url);

    // console.log('RESP', response)
    return {
        [name]: response.data
    };
}

export function* loadHome(dataUrls) {
    let data;
    try{
        const responses = yield dataUrls.map(dataUrl => {
            return call(fetchHome, dataUrl)
        })
        yield responses.map(response => {
            data = {...data,...response}
        })
        // console.log('data', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        yield put(successFetchHome({data}))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

function* watchHome(arg) {
    yield fork(loadHome, arg)
}
function* clientHome(arg) {
    yield takeEvery(SAGA_FETCH_HOME, function* (action){

        console.log('action.payload.data', action.payload.data)

        yield fork(loadHome, action.payload.data)
    });
}

function* helloSaga() {
    // console.log('Saga running')
}

function* clientsSaga() {
    // console.log('clientHomesSaga running')
}

export function* homeSaga(arg) {

    // console.log('ARG', arg)

    yield all([
        helloSaga(),
        watchHome(arg)
    ])
}

// Вызывается со стороны клиента
export function* clientHomeSaga(arg) {
    yield all([
        clientsSaga(),
        clientHome()
    ])
}