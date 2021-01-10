import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { sagaFetchTopCategories, loadFetchTopCategories, successFetchTopCategories, failureFetchTopCategories } from '../actions/topCategories';
import { SAGA_FETCH_TOP_CATEGORIES, LOAD_FETCH_TOP_CATEGORIES, SUCCESS_FETCH_TOP_CATEGORIES, FAILURE_FETCH_TOP_CATEGORIES } from "../types";
import { dataExtract } from './helpers';

function* loadTopCategoriesData(dataUrls) {
    try{
        // console.log('dataUrls', dataUrls)
        yield put(loadFetchTopCategories())
        const data = yield call(dataExtract, dataUrls);
        // console.log('data', data)
        yield put(successFetchTopCategories(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchTopCategories(e))
    }
}

export function* topCategoriesSaga(arg) {
    yield call(loadTopCategoriesData, [arg]);
}