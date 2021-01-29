import {SET_ROUTE, DROP_ROUTE }  from "../types";

const initState = null;

export default (state = initState, action) => {

    switch (action.type) {
        case SET_ROUTE:
            return action.payload
        // case SUCCESS_FETCH_CLASSIFIERS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: false,
        //         data: action.payload.data,
        //     }
        case DROP_ROUTE:
            return null
        default:
            return state
    }
}