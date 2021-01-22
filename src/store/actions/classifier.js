import {SAGA_FETCH_CLASSIFIER, LOAD_FETCH_CLASSIFIER, SUCCESS_FETCH_CLASSIFIER, FAILURE_FETCH_CLASSIFIER} from "../types";

// export const dropField = (data) => {
//     // console.log('data', data)
//     return {
//         type: DROP_FIELD,
//         payload: data
//     }
// }

export const sagaFetchClassifier = (data) => {
    return {
        type: SAGA_FETCH_CLASSIFIER,
        payload: {data}
    }
}

export const loadFetchClassifier = (classifier) => {
    return {
        type: LOAD_FETCH_CLASSIFIER,
        payload: {
            data: classifier
        }
    }
}

export const successFetchClassifier = data => {
    // console.log('data', data)
    return {
        type: SUCCESS_FETCH_CLASSIFIER,
        payload: data
    }
}

export const failureFetchClassifier = e => ({
    type: FAILURE_FETCH_CLASSIFIER,
    payload: {
        data: e
    }
})