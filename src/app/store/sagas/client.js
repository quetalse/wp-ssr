import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import axios from "axios";

import { SAGA_FETCH_TODOS} from "../types";
import { failureFetchTodos, successFetchTodos } from "../actions/todos";

const fetchTodos = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/todos');
}

function* requestTodo() {
    try{
        console.log('(**09')
        const response = yield call(fetchTodos);
        yield put(successFetchTodos(response.data))
    }catch(e){
        console.log(e)
        yield put(failureFetchTodos(e))
    }
}

function* watchTodoItemsRequest() {
    yield takeEvery(SAGA_FETCH_TODOS, requestTodo)
}

export default function* rootSaga() {
    yield all([
        fork(watchTodoItemsRequest)
    ])
}