import { SUCCESS_FETCH_BATHROOMS, FAILURE_FETCH_BATHROOMS }  from "../../../server/store/types";


const initState = {
    data: [],
    loading: false,
    error: false
};

export default (state = initState, action) => {
    console.log("REDUCE")
    // console.log(action)
    switch (action.type) {
        case SUCCESS_FETCH_BATHROOMS:
            console.log("SUCCESS_FETCH_BATHROOMS")

            return {
                ...state,
                loading: false,
                data: action.payload.data
            }
        case FAILURE_FETCH_BATHROOMS:
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        default:
            return state
    }
}