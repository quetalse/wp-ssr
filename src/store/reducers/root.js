import { DROP_FIELD,SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME, EXCLUDE_FIELD_STATE } from "../types";

const initState = {
    data: {},
    meta: {},
    loading: false,
    error: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_HOME:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    ...action.payload.data
                },
                meta: action.payload.meta
            }
        case FAILURE_FETCH_HOME:
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        case DROP_FIELD:
            let dropFields = {};
            action.payload.forEach((field) => {
                dropFields = {
                    ...dropFields,
                    [field]: undefined
                }
            })

            return {
                ...state,
                data: {
                    ...state.data,
                    ...dropFields
                },
            }
        default:
            return state
    }
}