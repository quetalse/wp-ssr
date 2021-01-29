import React from 'react';
import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
// import { sagaFetchClassifier } from "../../../store/actions/classifier";
// import { sagaFetchPage } from "../../../store/actions/page";
// import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
import { PageData } from "../../components/PageData";

/** LOCAL COMPONENTS **/
import { FilterPanel } from "./FilterPanel";
import { BathroomCardRandomList } from "./BathroomCardRandomList";
import { TopCategories } from "./TopCategories";

import "./index.scss";
// import {AppBtnSearch} from "../../components/UI/AppBtnSearch";

const Home = () => (
    <PageData>
        <FilterPanel/>
        <div className="row random-card-offers">
            <BathroomCardRandomList  classifierTitles={["type", "metro"]}/>
        </div>
        <div className="row top-categories">
            <TopCategories/>
        </div>
    </PageData>
)


export default {
    component: Home,
    serverSagaData: homeDataUrls.serverSagaData
}