import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { loadFetchClassifier, successFetchClassifier, failureFetchClassifier} from '../actions/classifier';
import { SAGA_FETCH_CLASSIFIER } from "../types";
import {dataExtract, dataClassifierTemplate } from './helpers';

function* loadClassifiersData(classifier) {
    const dataClassifier = dataClassifierTemplate(classifier);
    try{
        console.log('dataClassifier', dataClassifier)
        yield put(loadFetchClassifier(classifier))
        const data = yield call(dataExtract, dataClassifier);
        console.log('data', data)
        yield put(successFetchClassifier({data, classifier}))
    }catch(e){
        console.log(e)
        yield put(failureFetchClassifier(e))
    }
}

function* clientLoadClassifiersData(dataUrls) {
    yield takeEvery(SAGA_FETCH_CLASSIFIER, function* (action){
        const classifier = action['payload'].data;
        // console.log('data', data)
        yield fork(loadClassifiersData, classifier)
    });
}

export function* clientClassifiersSaga() {
    yield call(clientLoadClassifiersData);
}

export function* classifiersSaga(arg) {
    yield call(loadClassifiersData, [arg]);
}