import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { loadFetchClassifiers, successFetchClassifiers, failureFetchClassifiers} from '../actions/classifiers';
import { SAGA_FETCH_CLASSIFIERS } from "../types";
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
        // console.log('data', data)
        yield fork(loadClassifiersData, data)
    });
}

export function* clientClassifiersSaga() {
    yield call(clientLoadClassifiersData);
}

export function* classifiersSaga(arg) {
    yield call(loadClassifiersData, [arg]);
}