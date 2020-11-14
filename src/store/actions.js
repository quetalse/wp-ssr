import { FETCH_TODOS, SET_HELLO, REQUEST_TODOS } from "./types";
import axios from 'axios';

export const setHello = payload => ({
    type: SET_HELLO,
    payload
});

export const requestTodos = () => {
    return {
        type: REQUEST_TODOS
    }
}

export const fetchTodos = () => {
    console.log("actions")
    return {
        type: FETCH_TODOS
    }
}