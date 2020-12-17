import { SUCCESS_FETCH_BATHROOMS, FAILURE_FETCH_BATHROOMS }  from "../types";

const initState = {
    data: {},
    meta: {},
    loading: false,
    error: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_BATHROOMS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                meta: action.payload.meta
            }
        case FAILURE_FETCH_BATHROOMS:
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        default:
            return state
    }
}