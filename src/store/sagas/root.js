import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import { successFetchHome, failureFetchHome } from '../actions/home';
import {
    FAILURE_FETCH_CLASSIFIERS,
    LOAD_FETCH_CLASSIFIERS,
    SAGA_FETCH_CLASSIFIERS,
    SAGA_FETCH_HOME,
    SUCCESS_FETCH_CLASSIFIERS
} from "../types";

import { pageSaga } from './page';
import { classifiersSaga, clientClassifiersSaga } from "./classifiers";
import { topCategoriesSaga } from "./topCategories";

import { fetchData } from "../api";

export function* loadClassifiers(dataUrls) {
    let data;
    try{
        const responses = yield dataUrls.url.map(dataUrl => {
            return call(fetchData, dataUrl)
        })
        yield responses.map(response => {
            data = {...data,...response}
        })
        // console.log('data', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        yield put(successFetchHome({[dataUrls.name]: data}))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

export function* temp(dataUrls) {
    let data;
    try{
        const responses = yield dataUrls.url.map(dataUrl => {
            return call(fetchData, dataUrl)
        })
        yield responses.map(response => {
            data = {...data,...response}
        })
        return {[dataUrls.name]: data}
        // console.log('data', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        // yield put(successFetchHome({[dataUrls.name]: data}))
    }catch(e){
        console.log(e)
        // yield put(failureFetchHome(e))
    }
}

function* dataExtract(dataUrls, name = false){

    let data;
    const responses = yield dataUrls.map(dataUrl => {
        if(Array.isArray(dataUrl.url)){
            return call(dataExtract, dataUrl.url, dataUrl.name)
        }
        return call(fetchData, dataUrl)
    })
    yield responses.map(response => {
        data = {...data,...response}
    })
    if(name) return {[name]: data}
    else{
        return data;
    }
}

export function* loadRoot(dataUrls) {
    try{
        // let data;
        // const responses = yield dataUrls.map(dataUrl => {
        //     if(Array.isArray(dataUrl.url)){
        //         return call(temp, dataUrl)
        //     }
        //     return call(fetchData, dataUrl)
        // })

        // yield responses.map(response => {
        //     data = {...data,...response}
        // })

        // console.time('START');
        const data = yield call(dataExtract, dataUrls);
        // console.timeEnd('START');
        // console.log('DATA', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        yield put(successFetchHome(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

/**
 * Generator starts by SSR for fetching server data (source data provided from component export object key "serverSagaData")
 * @param arg - array of server data
 * @returns {Generator<*, void, *>}
 */
function* watchRoot(arg) {
    for (let i = 0; i < arg.length; i++) {
        switch (arg[i].name) {
            case 'page':
                yield fork(pageSaga, arg[i]);
                break;
            // case 'classifiers':
            //     yield fork(classifiersSaga, arg[i]);
            //     break;
            case 'topCategories':
                yield fork(topCategoriesSaga, arg[i]);
                break;
        }
        // if(arg[i].name === 'page') yield fork(pageSaga, arg[i]);
    }
    // yield arg.forEach((data) => {
    //     if(data.name === 'page') {
    //         call(pageSaga, arg[0].url)
    //     }
    // })

            // switch (data.name) {
        //     case 'page':
        //         console.log('data.name', data.name)
        //         yield call(pageSaga, data.url)
        //         break;
        //     // case 'classifiers':
        //     //     fork(classifiers, data.url)
        //     // case 'topCategories':
        //     //     fork(topCategories, data.url)
        //     default:
        //         return true
        // }
    // })
    // yield fork(loadRoot, arg)
}
function* clientRoot(arg){

    yield takeEvery(SAGA_FETCH_CLASSIFIERS, function* (action){
        const data = action['payload'].data;
        yield fork(loadClassifiers, data[0])
    });

    yield takeEvery(SAGA_FETCH_HOME, function* (action){
        // console.log('action.payload.data', action.payload.data)
        yield fork(loadRoot, action['payload'].data)
    });
}

function* helloSaga() {
    // console.log('Saga running')
}

function* clientsSaga() {
    // console.log('clientHomesSaga running')
}

export function* rootSaga(arg) {

    yield all([
        helloSaga(),
        watchRoot(arg)
    ])

    // yield all[
    //     call(watchRoot, arg)
    // ]
}

// Вызывается со стороны клиента
export function* clientRootSaga(arg) {
    // console.log('clientHomeSaga')
    yield all([
        clientClassifiersSaga(),
    ])
    // yield call(clientRoot)
}