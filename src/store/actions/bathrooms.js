import { SAGA_FETCH_BATHROOMS, SUCCESS_FETCH_BATHROOMS, FAILURE_FETCH_BATHROOMS } from "../types";

export const sagaFetchBathRooms = (data) => ({
    type: SAGA_FETCH_BATHROOMS,
    payload: {data}
})

export const successFetchBathrooms = bathrooms => ({
    type: SUCCESS_FETCH_BATHROOMS,
    payload: {
        data: bathrooms.data,
        meta: bathrooms.meta,
    }
})

export const failureFetchBathrooms = e => ({
    type: FAILURE_FETCH_BATHROOMS,
    payload: {
        data: e
    }
})