import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { sagaFetchPage, loadFetchPage, successFetchPage, failureFetchPage} from '../actions/page';
import {
    SAGA_FETCH_PAGE,
    LOAD_FETCH_PAGE,
    SUCCESS_FETCH_TOP_CATEGORIES,
    FAILURE_FETCH_HOME } from "../types";
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

export function* pageSaga(arg) {
    yield call(loadPageData, [arg]);
}