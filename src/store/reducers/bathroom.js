import { SUCCESS_FETCH_BATHROOM, FAILURE_FETCH_BATHROOM }  from "../../server/store/types";


const initState = {
    data: [],
    loading: false,
    error: false
};

export default (state = initState, action) => {
    // console.log("REDUCE")
    // console.log(action)
    switch (action.type) {
        case SUCCESS_FETCH_BATHROOM:
            return {
                ...state,
                loading: false,
                data: action.payload.data
            }
        case FAILURE_FETCH_BATHROOM:
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        default:
            return state
    }
}