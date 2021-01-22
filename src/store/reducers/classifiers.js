import {LOAD_FETCH_CLASSIFIER, SUCCESS_FETCH_CLASSIFIER, FAILURE_FETCH_CLASSIFIER }  from "../types";

const initState = {
    data: null,
    loading: false,
    error: false
};

export default (state = initState, action) => {

    switch (action.type) {
        case LOAD_FETCH_CLASSIFIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.data]:{
                        loading: true,
                        error: false,
                        data: null
                    }
                }

            }
        case SUCCESS_FETCH_CLASSIFIER:
            let classifier = action.payload.classifier;
            let data = action.payload.data[classifier];
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.classifier]: {
                        data: action.payload.data[classifier]
                    }
                }
                // loading: false,
                // error: false,
                // data: action.payload.data,
            }
        case FAILURE_FETCH_CLASSIFIER:
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