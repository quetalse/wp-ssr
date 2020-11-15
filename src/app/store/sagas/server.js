import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchTodos, failureFetchTodos} from '../actions/todos';

const fetchTodos = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/todos');
}

export function* loadInitialData() {
    try{
        const response = yield call(fetchTodos);
        yield put(successFetchTodos(response.data))
    }catch(e){
        console.log(e)
        yield put(failureFetchTodos(e))
    }
}

function* watch() {
    yield fork(loadInitialData)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* rootSaga() {

    yield all([
        helloSaga(),
        fork(watch)
    ])
}