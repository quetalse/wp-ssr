import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { sagaFetchClassifiers, loadFetchClassifiers, successFetchClassifiers, failureFetchClassifiers} from '../actions/classifiers';
import { SAGA_FETCH_CLASSIFIERS, LOAD_FETCH_CLASSIFIERS, SUCCESS_FETCH_CLASSIFIERS, FAILURE_FETCH_CLASSIFIERS } from "../types";
import {loadClassifiers} from "./root";
import { dataExtract } from './helpers';

function* loadClassifiersData(dataUrls) {
    try{
        // console.log('dataUrls', dataUrls)
        yield put(loadFetchClassifiers())
        const data = yield call(dataExtract, dataUrls);
        // console.log('data', data)
        yield put(successFetchClassifiers(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchClassifiers(e))
    }
}

function* clientLoadClassifiersData(dataUrls) {
    yield takeEvery(SAGA_FETCH_CLASSIFIERS, function* (action){
        const data = action['payload'].data;
        console.log('data', data)
        yield fork(loadClassifiersData, data)
    });
}

export function* clientClassifiersSaga(arg) {
    // console.log('ARG', arg)
    yield call(clientLoadClassifiersData);
}

export function* classifiersSaga(arg) {
    // console.log('ARG', arg)
    yield call(loadClassifiersData, [arg]);
}