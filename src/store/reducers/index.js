import { combineReducers } from "redux";
import page from "./page";
import classifiers from "./classifiers";
import topCategories from "./topCategories";
import root from "./root";

export default combineReducers({
    page,
    topCategories,
    classifiers
})