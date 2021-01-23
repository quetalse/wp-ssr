import {LOAD_FETCH_TOP_CATEGORIES, SUCCESS_FETCH_TOP_CATEGORIES, FAILURE_FETCH_TOP_CATEGORIES }  from "../types";

const initState = {
    data: null,
    loading: false,
    error: false
};

export default (state = initState, action) => {

    switch (action.type) {
        case LOAD_FETCH_TOP_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false,
                data: null
            }
        case SUCCESS_FETCH_TOP_CATEGORIES:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
            }
        case FAILURE_FETCH_TOP_CATEGORIES:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload.data
            }
        default:
            return state
    }
}