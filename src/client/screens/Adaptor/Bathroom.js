import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
// import { sagaFetchClassifiers } from "../../../store/actions/classifier";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
import { FilterPanelLeft } from "../../components/FilterPanelLeft";


/** LOCAL COMPONENTS **/
// import { HomeForm } from "./HomeForm";
// import { RandomBathList } from "./RandomBathList";
// import { TopCategories } from "./TopCategory";

import "./index.scss";
import {BathroomCardList} from "../Search/BathroomCardList";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = homeDataUrls;

export const Bathroom = () => {
    //
    // const history = useHistory()
    // const dispatch = useDispatch();

    return (
        <Fragment>
            <div className="col s3">
                Банный
            </div>
            <div className="col s9">
                Комплекс
            </div>
        </Fragment>
    )
}