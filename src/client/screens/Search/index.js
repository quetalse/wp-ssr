import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { searchDaraUrls } from '../../screensDataUrls';
import { useHistory, useLocation } from 'react-router-dom'

/** ACTIONS **/
import { sagaFetchClassifier } from "../../../store/actions/classifier";
import { sagaFetchPage } from "../../../store/actions/page";

/** APP COMPONENTS **/
import { PageData } from "../../components/PageData";
import { FilterPanelLeft } from "../../components/FilterPanelLeft";

/** LOCAL COMPONENTS **/
import { BathroomCardList } from "./BathroomCardList";

import "./index.scss";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = searchDaraUrls;

const Search = () => {

    const {pathname, search} = useLocation();
    // console.log('location', location);

    const searchPage = [{
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page${pathname}${search}`},
            {name: 'count', url: `${_apiBase}/api/page/search?count`}
        ]
    }]

    // const params = new URLSearchParams(history.location.search);
    // const type = params.get('type');
    // const metro = params.get('metro');

    return (
        <PageData clientSagaData={searchPage}>
            <div className="row">
                <div className="col s3">
                    <FilterPanelLeft routes={clientSagaData}/>
                </div>
                <div className="col s9">
                    <BathroomCardList
                        classifierTitles={["aqua", "entertainment", "equipment", "location", "type", "purpose", "services", "metro"]}
                        count={7}
                    />
                </div>
            </div>
        </PageData>
    )
}

export default {
    component: Search,
    serverSagaData: serverSagaData,
}