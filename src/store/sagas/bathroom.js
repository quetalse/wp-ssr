import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from "axios";

import {successFetchBathroom, failureFetchBathroom} from '../actions/bathroom';
import { SAGA_FETCH_BATHROOM } from "../types";

const fetchBathroom= async (url) => {
    const response = await axios(`${url}`);
    return response.data;
}

export function* loadBathroom(arg) {
    try{
        const data = yield call(fetchBathroom, arg.dataUrl);
        const meta = yield call(fetchBathroom, arg.metaUrl);

        console.log("data", data)

        yield put(successFetchBathroom({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathroom(e))
    }
}

function* watchBathroom(arg) {
    yield fork(loadBathroom, arg)
}

function* clientBathroom() {
    yield takeLatest(SAGA_FETCH_BATHROOM, function* (action){
        yield fork(loadBathroom, action.payload.data)
    });
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomSaga(arg) {
    yield all([
        helloSaga(),
        fork(watchBathroom, arg)
    ])
}

// Вызывается со стороны клиента
export function* clientBathroomSaga(arg) {
    yield all([
        helloSaga(),
        fork(clientBathroom)
    ])
}