import {combineReducers} from "redux";
import bathrooms from './bathrooms';
import bathroom from './bathroom';
import home from './home';

export default  combineReducers({
    bathrooms,
    bathroom,
    home
})