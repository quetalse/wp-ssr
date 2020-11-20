import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";
const fetch = require('node-fetch');

import {successFetchBathrooms, failureFetchBathrooms} from '../../server/store/actions/bathrooms';

const fetchBathrooms = async (url) => {
    console.log('url', url)
    // const response = await axios("https://jsonplaceholder.typicode.com/photos");
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

export function* loadBathrooms(arg) {
    try{
        const data = yield call(fetchBathrooms, arg.dataUrl);
        const meta = yield call(fetchBathrooms, arg.metaUrl);

        console.log(data)
        yield put(successFetchBathrooms({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathrooms(e))
    }
}

function* watchBathrooms(arg) {
    yield fork(loadBathrooms, arg)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomsSaga(arg) {
    console.log('arg', arg)
    yield all([
        helloSaga(),
        fork(watchBathrooms, arg)
    ])
}