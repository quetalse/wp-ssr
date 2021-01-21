import {SET_ROUTE, DROP_ROUTE} from "../types";

// export const dropField = (data) => {
//     // console.log('data', data)
//     return {
//         type: DROP_FIELD,
//         payload: data
//     }
// }

export const setRoute = (data) => {
    return {
        type: SET_ROUTE,
        payload: data
    }
}

export const dropRoute = () => {
    return {
        type: DROP_ROUTE
    }
}