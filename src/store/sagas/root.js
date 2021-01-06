import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import fetch from 'node-fetch';

import { successFetchHome, failureFetchHome } from '../actions/home';
import { SAGA_FETCH_CLASSIFIERS, SAGA_FETCH_HOME } from "../types";
import { fetchData } from "../api";

const fetchRoot = async ({name, url}) => {

    // console.log('url', url)

    const response = await fetch(url);
    const result = await response.json();
    //     {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }) .then(function(response){
    //     console.log(response)
    //     return response.json();
    // })
    //     .then(function(myJson) {
    //         console.log(myJson);
    //     });

    // console.log('result', result)
    return {
        [name]: result
    };
}

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


        const data = yield call(dataExtract, dataUrls);
        // console.log('DATA', data)
        // const data = yield call(fetchHome, arg.dataUrl);
        // const meta = yield call(fetchHome, arg.dataUrl) || {};
        yield put(successFetchHome(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchHome(e))
    }
}

function* watchRoot(arg) {
    // console.log('ARGUMENTS', arg)
    yield fork(loadRoot, arg)
}
function* clientRoot(arg) {

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
    // yield all([
    //     clientsSaga(),
    //     clientHome()
    // ])
    yield call(clientRoot)
}