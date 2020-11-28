import { takeLatest, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchBathrooms, failureFetchBathrooms} from '../actions/bathrooms';
import { SAGA_FETCH_BATHROOMS } from "../types";

const fetchBathrooms = async (url) => {
    const response = await axios(url);
    return response.data;
}

export function* loadBathrooms(arg) {
    try{
        const data = yield call(fetchBathrooms, arg.dataUrl);
        const meta = yield call(fetchBathrooms, arg.metaUrl);
        yield put(successFetchBathrooms({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathrooms(e))
    }
}

function* watchBathrooms(arg) {
    yield fork(loadBathrooms, arg)
}
function* clientBathrooms(arg) {
    yield takeLatest(SAGA_FETCH_BATHROOMS, function* (action){
        yield fork(loadBathrooms, action.payload.data)
    });
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomsSaga(arg) {
    yield all([
        helloSaga(),
        fork(watchBathrooms, arg)
    ])
}

// Вызывается со стороны клиента
export function* clientBathroomsSaga(arg) {
    yield all([
        helloSaga(),
        fork(clientBathrooms)
    ])
}