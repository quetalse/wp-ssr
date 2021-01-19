import {LOAD_FETCH_PAGE, SUCCESS_FETCH_PAGE, FAILURE_FETCH_PAGE, DROP_FIELD} from "../types";

const initState = {
    data: null,
    loading: false,
    error: false
};

export default (state = initState, action) => {

    switch (action.type) {
        case LOAD_FETCH_PAGE:
            return {
                ...state,
                loading: true,
                error: false,
                data: null
            }
        case SUCCESS_FETCH_PAGE:
            // console.log('action.payload.data', action.payload.data)
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    ...action.payload.data
                },
            }
        case FAILURE_FETCH_PAGE:
            // console.log('action.payload.data', action.payload.data)
            return {
                ...state,
                loading: false,
                data: null,
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
                data: null,
            }

        default:
            return state
    }
}