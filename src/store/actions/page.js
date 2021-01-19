import {
    SAGA_FETCH_PAGE,
    LOAD_FETCH_PAGE,
    SUCCESS_FETCH_PAGE,
    FAILURE_FETCH_PAGE,
    DROP_FIELD,
    PUSH_ROUTE_PAGE
} from "../types";

// export const dropField = (data) => {
//     // console.log('data', data)
//     return {
//         type: DROP_FIELD,
//         payload: data
//     }
// }

export const sagaFetchPage = (data) => {

    return {
        type: SAGA_FETCH_PAGE,
        payload: {data}
    }
}

export const loadFetchPage = () => {
    return {
        type: LOAD_FETCH_PAGE
    }
}

export const successFetchPage = data => {
    // console.log('data', data)
    return {
        type: SUCCESS_FETCH_PAGE,
        payload: {
            data
        }
    }
}

export const failureFetchPage = e => {
    console.log('e', e.name)
    console.log('e', e.message)
    return {
        type: FAILURE_FETCH_PAGE,
        payload: {
            data: e
        }
    }
}
export const dropField = (data) => {
    // console.log('data', data)
    return {
        type: DROP_FIELD,
        payload: data
    }
}

export const pushRoute = data => {
    return {
        type: PUSH_ROUTE_PAGE,
        payload: data
    }
}
