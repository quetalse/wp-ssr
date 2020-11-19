import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchBathroom, failureFetchBathroom} from '../../server/store/actions/bathroom';

const fetchBathroom= async (url) => {
    return await axios.get(`${url}`);
}

export function* loadBathroom(data) {

    try{
        const response = yield call(fetchBathroom, data.url);
        // console.log('response', response)
        yield put(successFetchBathroom(response.data))
    }catch(e){
        console.log(e)
        yield put(failureFetchBathroom(e))
    }
}

function* watchBathroom(data) {
    yield fork(loadBathroom, data)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* bathroomSaga(data) {

    yield all([
        helloSaga(),
        fork(watchBathroom, data)
    ])
}