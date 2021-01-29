import { select, call, cancel, fork, put, takeEvery } from 'redux-saga/effects';
import { loadFetchClassifier, successFetchClassifier, failureFetchClassifier} from '../actions/classifier';
import { SAGA_FETCH_CLASSIFIER } from "../types";
import {dataExtract, dataClassifierTemplate } from './helpers';



function* loadClassifiersData(classifier) {
    const dataClassifier = dataClassifierTemplate(classifier);
    const state = yield select();
    if(!state.classifiers[classifier]){
        try{
            // console.log('state', state.classifiers)
            // console.log('classifier', )
            yield put(loadFetchClassifier(classifier))
            const data = yield call(dataExtract, dataClassifier);
            let refactor = {};

            data[classifier].map(([id, title, url]) => {
                refactor[id] = { title, url}
            })

            // console.log('{\n' +
            //     '                data, classifier\n' +
            //     '            }', {
            //     data, classifier
            // })
            yield put(successFetchClassifier({
                data:{
                    [classifier]: refactor
                }, classifier
            }))
        }catch(e){
            console.log(e)
            yield put(failureFetchClassifier(e, classifier))
        }
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