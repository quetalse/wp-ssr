import {FETCH_TODOS} from "../types";

const initState = [];

export default (state = initState, action) => {
    console.log("REDUCE")
    console.log(action)
    switch (action.type) {
        case FETCH_TODOS:
            return action.payload
        default:
            return state
    }
}