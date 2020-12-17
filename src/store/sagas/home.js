import { takeLatest, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchHome, failureFetchHome} from '../actions/home';
import { SAGA_FETCH_HOME } from "../types";

const fetchHome = async (url) => {
    const response = await axios(url);
    return response.data;
}

export function* loadHome(arg) {
    try{
        const data = yield call(fetchHome, arg.dataUrl);
        console.log(data)

        const meta = yield call(fetchHome, arg.metaUrl);
        yield put(successFetchHome({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

function* watchHome(arg) {
    yield fork(loadHome, arg)
}
function* clientHome(arg) {
    yield takeLatest(SAGA_FETCH_HOME, function* (action){
        yield fork(loadHome, action.payload.data)
    });
}

function* helloSaga() {
    console.log('Saga running')
}

function* clientsSaga() {
    console.log('clientBathroomsSaga running')
}

export function* bathroomsSaga(arg) {
    yield all([
        helloSaga(),
        fork(watchHome, arg)
    ])
}

// Вызывается со стороны клиента
export function* clientBathroomsSaga(arg) {
    yield all([
        clientsSaga(),
        fork(clientBathrooms)
    ])
}