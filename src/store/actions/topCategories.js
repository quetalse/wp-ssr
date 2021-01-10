import {SAGA_FETCH_TOP_CATEGORIES, LOAD_FETCH_TOP_CATEGORIES, SUCCESS_FETCH_TOP_CATEGORIES, FAILURE_FETCH_TOP_CATEGORIES} from "../types";

// export const dropField = (data) => {
//     // console.log('data', data)
//     return {
//         type: DROP_FIELD,
//         payload: data
//     }
// }

export const sagaFetchTopCategories = (data) => {

    return {
        type: SAGA_FETCH_TOP_CATEGORIES,
        payload: {data}
    }
}

export const loadFetchTopCategories = () => {
    return {
        type: LOAD_FETCH_TOP_CATEGORIES
    }
}

export const successFetchTopCategories = data => {
    // console.log('data', data)
    return {
        type: SUCCESS_FETCH_TOP_CATEGORIES,
        payload: {
            data: data
        }
    }
}

export const failureFetchTopCategories = e => ({
    type: FAILURE_FETCH_TOP_CATEGORIES,
    payload: {
        data: e
    }
})