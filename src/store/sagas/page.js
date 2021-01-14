import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { sagaFetchPage, loadFetchPage, successFetchPage, failureFetchPage, dropField} from '../actions/page';
import {
    SAGA_FETCH_PAGE,
    LOAD_FETCH_PAGE,
    SUCCESS_FETCH_TOP_CATEGORIES,
    FAILURE_FETCH_HOME, SAGA_FETCH_CLASSIFIERS, PUSH_ROUTE_PAGE
} from "../types";
import { dataExtract } from './helpers';

function* loadPageData(dataUrls) {
    try{
        yield put(loadFetchPage())
        const data = yield call(dataExtract, dataUrls);
        yield put(successFetchPage(data))
    }catch(e){
        yield put(failureFetchPage(e.message))
    }
}

function* pagePushRoute({url, history}) {
    yield put(dropField(['page']))
    history.push(url);
}


function* clientLoadPageData(dataUrls) {
    yield takeEvery(SAGA_FETCH_PAGE, function* (action){
        const data = action['payload'].data;
        // console.log('data', data)
        yield fork(loadPageData, data)
    });
}


export function* clientPageSaga() {
    yield call(clientLoadPageData);
}

export function* clientPagePushRoute(){
    yield takeEvery(PUSH_ROUTE_PAGE, function* (action){
        const data = action['payload'];
        console.log('action', data)
        yield fork(pagePushRoute, data)
    });
}

export function* pageSaga(arg) {
    yield call(loadPageData, [arg]);
}