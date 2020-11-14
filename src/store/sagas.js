import { put, takeEvery, all, call } from 'redux-saga/effects';
import { FETCH_TODOS } from "./types";
import axios from "axios";


const fetchTodos = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/todos');
}

function* incrementAsync() {
    console.log("resp")
    const response = yield call(fetchTodos)
    console.log("resp", response)
    yield put({ type: FETCH_TODOS , payload: response.data})
}

function* watchTodoItemsRequest() {
    yield takeEvery("REQUEST_TODOS", incrementAsync)
}

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchTodoItemsRequest()
    ])
}