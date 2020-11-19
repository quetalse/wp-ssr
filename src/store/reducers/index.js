import {combineReducers} from "redux";
import todos from './todos';
import bathrooms from './bathrooms';
import bathroom from './bathroom';

export default  combineReducers({
    todos,
    bathrooms,
    bathroom
})