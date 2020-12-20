import { SAGA_FETCH_HOME, SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME, EXCLUDE_FIELD_STATE } from "../types";

export const sagaFetchHome = (data) => ({
    type: SAGA_FETCH_HOME,
    payload: {data}
})

export const excludeFieldState = field => ({
  type:  EXCLUDE_FIELD_STATE,
  payload: field
})

export const successFetchHome = home => {
    // console.log('home', home)
    return {
        type: SUCCESS_FETCH_HOME,
        payload: {
            data: home.data,
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