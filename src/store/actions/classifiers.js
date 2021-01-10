import {SAGA_FETCH_CLASSIFIERS, LOAD_FETCH_CLASSIFIERS, SUCCESS_FETCH_CLASSIFIERS, FAILURE_FETCH_CLASSIFIERS} from "../types";

// export const dropField = (data) => {
//     // console.log('data', data)
//     return {
//         type: DROP_FIELD,
//         payload: data
//     }
// }

export const sagaFetchClassifiers = (data) => {
    return {
        type: SAGA_FETCH_CLASSIFIERS,
        payload: {data}
    }
}

export const loadFetchClassifiers = () => {
    return {
        type: LOAD_FETCH_CLASSIFIERS
    }
}

export const successFetchClassifiers = data => {
    // console.log('data', data)
    return {
        type: SUCCESS_FETCH_CLASSIFIERS,
        payload: {
            data: data
        }
    }
}

export const failureFetchClassifiers = e => ({
    type: FAILURE_FETCH_CLASSIFIERS,
    payload: {
        data: e
    }
})