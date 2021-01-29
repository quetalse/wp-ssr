import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { loadFetchTopCategories, successFetchTopCategories, failureFetchTopCategories } from '../actions/topCategories';
import { SAGA_FETCH_TOP_CATEGORIES } from "../types";
import { dataExtract, dataTopCategoriesTemplate } from './helpers';

function* loadTopCategoriesData(dataTopCategories) {
    try{
        // console.log('dataUrls', dataUrls)
        yield put(loadFetchTopCategories())
        const data = yield call(dataExtract, dataTopCategories);
        // console.log('data', data)
        yield put(successFetchTopCategories(data))
    }catch(e){
        console.log(e)
        yield put(failureFetchTopCategories(e))
    }
}

function* clientLoadTopCategoriesData(dataUrls) {
    yield takeEvery(SAGA_FETCH_TOP_CATEGORIES, function* (action){
        const route = action['payload'].data;
        const dataTopCategories = dataTopCategoriesTemplate(route)
        yield fork(loadTopCategoriesData, dataTopCategories)
    });
}

export function* clientTopCategoriesSaga() {
    yield call(clientLoadTopCategoriesData);
}

export function* topCategoriesSaga(arg) {
    yield call(loadTopCategoriesData, [arg]);
}