import { combineReducers } from "redux";
import page from "./page";
import classifiers from "./classifiers";
import topCategories from "./topCategories";
import route from "./route";
import root from "./root";

export default combineReducers({
    route,
    page,
    topCategories,
    classifiers
})