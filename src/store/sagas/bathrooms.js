import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchBathrooms, failureFetchBathrooms} from '../../server/store/actions/bathrooms';

const fetchBathrooms= async (url) => {
    return await axios.get(`${url}`);
}

export function* loadBathrooms(data) {

    try{
        const data = yield call(fetchBathrooms, data.dataUrl);
        const meta = yield call(fetchBathrooms, data.metaUrl);
        yield put(successFetchBathrooms({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathrooms(e))
    }
}

function* watchBathrooms(data) {
    yield fork(loadBathrooms, data)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomsSaga(data) {
    console.log('data', data)
    yield all([
        helloSaga(),
        fork(watchBathrooms, data)
    ])
}