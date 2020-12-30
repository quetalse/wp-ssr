import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import fetch from 'node-fetch';
import axios from "axios";

import {successFetchHome, failureFetchHome} from '../actions/home';
import { SAGA_FETCH_HOME } from "../types";

const fetchRoot = async ({name, url}) => {

    // console.log('url', url)

    const response = await fetch(url);
    const result = await response.json();
    //     {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }) .then(function(response){
    //     console.log(response)
    //     return response.json();
    // })
    //     .then(function(myJson) {
    //         console.log(myJson);
    //     });

    // console.log('result', result)
    return {
        [name]: result
    };
}

export function* loadRoot(dataUrls) {

    let data;
    try{
        const responses = yield dataUrls.map(dataUrl => {
            return call(fetchRoot, dataUrl)
        })
        yield responses.map(response => {
            data = {...data,...response}
        })
        console.log('data', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        yield put(successFetchHome(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

function* watchRoot(arg) {
    console.log('arg', arg)
    yield fork(loadRoot, arg)
}
function* clientRoot(arg) {
    yield takeEvery(SAGA_FETCH_HOME, function* (action){

        // console.log('action.payload.data', action.payload.data)

        yield fork(loadRoot, action['payload'].data)
    });
}

function* helloSaga() {
    // console.log('Saga running')
}

function* clientsSaga() {
    // console.log('clientHomesSaga running')
}

export function* rootSaga(arg) {



    yield all([
        helloSaga(),
        watchRoot(arg)
    ])

    // yield all[
    //     call(watchRoot, arg)
    // ]
}

// Вызывается со стороны клиента
export function* clientRootSaga(arg) {
    // console.log('clientHomeSaga')
    // yield all([
    //     clientsSaga(),
    //     clientHome()
    // ])
    yield all[
        call(clientRoot)
    ]
}