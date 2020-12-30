import { SAGA_FETCH_HOME, SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME } from "../types";

export const sagaFetchHome = (data) => ({
    type: SAGA_FETCH_HOME,
    payload: {data}
})

export const successFetchHome = data => {
    console.log('098', {
        ...data,
        // meta: home.meta,
        meta: {},
    })
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