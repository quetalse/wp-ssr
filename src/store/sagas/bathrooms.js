import { takeLatest, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";
const fetch = require('node-fetch');

import {successFetchBathrooms, failureFetchBathrooms} from '../../server/store/actions/bathrooms';
import { SAGA_FETCH_BATHROOMS } from "../types";

const fetchBathrooms = async (url) => {

    const response = await axios(url);
    // const response = await fetch(url);
    // const json = await response.json();
    //
    return response.data;
// }
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
    console.log('arg', arg)
    yield takeLatest(SAGA_FETCH_BATHROOMS, loadBathrooms);
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomsSaga(arg) {
    // console.log('arg', arg)
    yield all([
        helloSaga(),
        fork(watchBathrooms, arg),
        fork(clientBathrooms, arg)
    ])
}

export function* clientBathroomsSaga(arg) {
    // console.log('arg', arg)
    yield all([
        fork(clientBathrooms, arg)
    ])
}