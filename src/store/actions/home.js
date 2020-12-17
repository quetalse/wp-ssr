import { SAGA_FETCH_HOME, SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME } from "../types";

export const sagaFetchHome = (data) => ({
    type: SAGA_FETCH_HOME,
    payload: {data}
})

export const successFetchHome = home => ({
    type: SUCCESS_FETCH_HOME,
    payload: {
        data: home.data,
        meta: home.meta,
    }
})

export const failureFetchHome = e => ({
    type: FAILURE_FETCH_HOME,
    payload: {
        data: e
    }
})