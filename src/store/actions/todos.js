import { SUCCESS_FETCH_TODOS, FAILURE_FETCH_TODOS, SAGA_FETCH_TODOS } from "../types";

export const sagaFetchTodos = () => ({
  type: SAGA_FETCH_TODOS
})

export const successFetchTodos = todos => ({
    type: SUCCESS_FETCH_TODOS,
    payload: {
        data: todos
    }
})

export const failureFetchTodos = e => ({
    type: FAILURE_FETCH_TODOS,
    payload: {
        data: e
    }
})