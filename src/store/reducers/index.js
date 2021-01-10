import { combineReducers } from "redux";
import page from "./page";
import classifiers from "./classifiers";
import topCategories from "./topCategories";
import root from "./root";

export default combineReducers({
    // bathrooms,
    // bathroom,
    page,
    topCategories,
    classifiers
    // root
})