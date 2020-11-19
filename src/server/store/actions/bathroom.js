import { SAGA_FETCH_BATHROOM, SUCCESS_FETCH_BATHROOM, FAILURE_FETCH_BATHROOM } from "../types";

export const sagaFetchBathRoom = () => ({
    type: SAGA_FETCH_BATHROOM
})

export const successFetchBathroom = bathrooms => ({
    type: SUCCESS_FETCH_BATHROOM,
    payload: {
        data: bathrooms
    }
})

export const failureFetchBathroom = e => ({
    type: FAILURE_FETCH_BATHROOM,
    payload: {
        data: e
    }
})