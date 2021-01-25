import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { homeDataUrls } from '../../screensDataUrls'

/** HOC COMPONENTS **/
import { PageData } from "../../components/PageData";

/** ACTIONS **/
// import { sagaFetchClassifier } from "../../../store/actions/classifier";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
// import { PageMeta } from "../../components/PageDataMeta";
import { AppError } from "../../components/UI/AppError";
import { AppLoader } from "../../components/UI/AppLoader";
// import { PageInfoHeader } from "../../components/PageDataHeader";
// import { PageInfoFooter } from "../../components/PageDataFooter";

/** LOCAL COMPONENTS **/
// import { HomeForm } from "./HomeForm";
// import { RandomBathList } from "./RandomBathList";
// import { TopCategories } from "./TopCategory";

import { Bathroom } from './Bathroom'
import { Category } from './Category';
import Home from '../Home';

import "./index.scss";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = homeDataUrls;


const contentSwitch = pageType => {
    switch(pageType) {
        case 'bathroom':
            return Bathroom;
        case 'category':
            return Category;
        default:
            return Home.component;
    }
}

const Adaptor = () => {

    const {pathname, search} = useLocation();
    const dispatch = useDispatch();

    const routeData = useSelector(state => state.route);
    const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));

    const isEqualRoute = routeData === pathname

    // console.log('pageData', pageData)

    let Content = () => {};

    if(pageData){
        Content = contentSwitch(`${pageData.type_pageId}`);

        // console.log('content', content)
    }

    // console.log('isEqualRoute', isEqualRoute)

    useEffect(() => {
        // if(!pageData && !pageLoading){
        if(!isEqualRoute){
            // const url = adaptorPage.filter((route)=>{
            //     return route.name === 'page'
            // });
            // let pathname = '/category'
            // let pathname = '/bath'
            // console.log('sagaFetchPage')
            dispatch(sagaFetchPage(pathname))
        }
    },[pathname])

    //
    // console.log('pageLoading', pageLoading)
    // console.log('pageError', pageError)
    // console.log('pageData', pageData)

    if(!isEqualRoute || pageLoading) return <AppLoader/>
    if(pageError) return <AppError error={pageError}/>

    if(pageData && isEqualRoute) return (
        // <Fragment>
        //     1
        // </Fragment>
        <PageData>
            <Content/>
        </PageData>
    )
}

export default {
    component: Adaptor,
    serverSagaData: []
}