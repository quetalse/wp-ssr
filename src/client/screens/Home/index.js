import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
import { sagaFetchClassifier } from "../../../store/actions/classifier";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
import { PageData } from "../../components/PageData";

/** LOCAL COMPONENTS **/
import { FilterPanel } from "./FilterPanel";
import { BathroomCardRandomList } from "./BathroomCardRandomList";
import { TopCategories } from "./TopCategories";

import "./index.scss";
import {AppBtnSearch} from "../../components/UI/AppBtnSearch";

const {clientSagaData, serverSagaData} = homeDataUrls;
const Home = () => {

    const dispatch = useDispatch();
    // const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });

    // useEffect(() => {
    //     if(!classifiersData && !classifiersLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'classifiers'
    //         });
    //         dispatch(sagaFetchClassifiers(url))
    //     }
    // },[classifiersData, classifiersLoading])

    return (
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
}

export default {
    component: Home,
    serverSagaData: serverSagaData
}