import {combineReducers} from "redux";
import todos from './todos';
import bathrooms from './bathrooms';

export default  combineReducers({
    todos,
    bathrooms
})