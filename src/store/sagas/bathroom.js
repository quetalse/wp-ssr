import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchBathroom, failureFetchBathroom} from '../../server/store/actions/bathroom';

const fetchBathroom= async (url) => {
    const response = await axios(`${url}`);
    // const response = await fetch(url);
    // const json = await response.json();
    //
    return response.data;
}

export function* loadBathroom(arg) {

    try{
        const data = yield call(fetchBathroom, arg.dataUrl);
        const meta = yield call(fetchBathroom, arg.metaUrl);
        // console.log('data', data)
        // console.log('meta', meta)
        yield put(successFetchBathroom({data, meta}))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathroom(e))
    }
}

function* watchBathroom(arg) {
    yield fork(loadBathroom, arg)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomSaga(arg) {
    console.log('arg', arg)
    yield all([
        helloSaga(),
        fork(watchBathroom, arg)
    ])
}