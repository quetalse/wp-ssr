import {DROP_FIELD,  SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME, SAGA_FETCH_HOME} from "../types";

export const dropField = (data) => {
    // console.log('data', data)
    return {
        type: DROP_FIELD,
        payload: data
    }
}

export const sagaFetchHome = (data) => {

    return {
        type: SAGA_FETCH_HOME,
        payload: {data}
    }
}

export const successFetchHome = data => {
    // console.log('data', data)
    return {
        type: SUCCESS_FETCH_HOME,
        payload: {
            data: data,
            // meta: home.meta,
            meta: {},
        }
    }
}

export const failureFetchHome = e => ({
    type: FAILURE_FETCH_HOME,
    payload: {
        data: e
    }
})