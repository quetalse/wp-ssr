import { SUCCESS_FETCH_HOME, FAILURE_FETCH_HOME, EXCLUDE_FIELD_STATE } from "../types";

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
        case EXCLUDE_FIELD_STATE:
            let updateState = {...state};
            let {data} = updateState
            delete data[action.payload]

            console.log('data', data)
            console.log('action.payload', action.payload)

            return {
                ...state
            }
        default:
            return state
    }
}