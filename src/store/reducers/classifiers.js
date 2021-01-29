import {LOAD_FETCH_CLASSIFIER, SUCCESS_FETCH_CLASSIFIER, FAILURE_FETCH_CLASSIFIER }  from "../types";

const initState = {};

export default (state = initState, action) => {

    switch (action.type) {
        case LOAD_FETCH_CLASSIFIER:
            return {
                ...state,
                [action.payload.data]:{
                    loading: true,
                    error: false,
                    data: null
                }
            }
        case SUCCESS_FETCH_CLASSIFIER:
            let classifier = action.payload.classifier;
            let data = action.payload.data[classifier];

            return {
                ...state,
                [classifier]: {
                    data,
                    loading: false,
                    error: false,
                }
                // loading: false,
                // error: false,
                // data: action.payload.data,
            }
        case FAILURE_FETCH_CLASSIFIER:
            let errorClassifier = action.payload.classifier;
            let error = action.payload.data[errorClassifier];
            return {
                ...state,
                [errorClassifier]: {
                    loading: false,
                    data: null,
                    error
                }
            }
        default:
            return state
    }
}