import { SAGA_FETCH_BATHROOM, SUCCESS_FETCH_BATHROOM, FAILURE_FETCH_BATHROOM } from "../types";

export const sagaFetchBathRoom = (data) => ({
    type: SAGA_FETCH_BATHROOM,
    payload: {data}
})

export const successFetchBathroom = bathroom => ({
    type: SUCCESS_FETCH_BATHROOM,
    payload: {
        data: bathroom.data,
        meta: bathroom.meta,
    }
})

export const failureFetchBathroom = e => ({
    type: FAILURE_FETCH_BATHROOM,
    payload: {
        data: e
    }
})