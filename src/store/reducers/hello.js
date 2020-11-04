import {SET_HELLO} from "../types";

const initState = '';

export default (state = initState, action) => {
    switch (action.type) {
        case SET_HELLO:
            return action.payload
        default:
            return state
    }
}