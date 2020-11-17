import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import axios from "axios";

import {successFetchTodos, failureFetchTodos} from '../actions/todos';

const fetchTodos = async (el) => {
    console.log('EL', el)
    return await axios.get(`https://jsonplaceholder.typicode.com/todos/${el}`);
}

export function* loadInitialData(args) {

    try{
        const response = yield call(fetchTodos, args.el);
        yield put(successFetchTodos(response.data))
    }catch(e){
        console.log(e)
        yield put(failureFetchTodos(e))
    }
}

function* watch(args) {
    yield fork(loadInitialData, args)
}

function* helloSaga() {
    console.log('Saga running')
}

export function* rootSaga(args) {

    console.log('args', args)

    yield all([
        helloSaga(),
        fork(watch, args)
    ])
}