import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/

/** LOCAL COMPONENTS **/
// import { HomeForm } from "./HomeForm";
// import { RandomBathList } from "./RandomBathList";
// import { TopCategories } from "./TopCategory";



import "./index.scss";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = homeDataUrls;



const contentSwitch = pageType => {
    switch(pageType) {
        case 'category':
            return 'bar';
        default:
            return 'foo';
    }
}

export const Category = () => {

    // const {pathname, search} = useLocation();
    // const dispatch = useDispatch();
    // const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
    // // const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
    // //     // console.log('STATE', state)
    // //     return state.classifiers
    // // });
    //
    // const adaptorPage = [{
    //     name: 'page',
    //     url: [
    //         {name: 'page',  url: `${_apiBase}/api/page/category`},
    //         // {name: 'page',  url: `${_apiBase}/api/page${pathname}${search}`},
    //         // {name: 'count', url: `${_apiBase}/api/page/search?count`}
    //     ]
    // }]
    //
    // console.log('pageData', pageData)
    // console.log('pageError', pageError)
    // console.log('pageLoading', pageLoading)
    //
    // let content;



    // useEffect(() => {
    //     if(!pageData && !pageLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'page'
    //         });
    //         dispatch(sagaFetchPage(url))
    //     }
    //     // return () => {
    //     //     console.log('drop')
    //     //     dispatch(dropField(['page']))
    //     // };
    // },[pageData, pageLoading])

    // useEffect(() => {
    //     if(!classifiersData && !classifiersLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'classifiers'
    //         });
    //         dispatch(sagaFetchClassifiers(url))
    //     }
    // },[classifiersData, classifiersLoading])

    return (
            <Fragment>
                <div>Category</div>
            </Fragment>
    )
}

// export default {
//     component: Category,
//     serverSagaData: []
// }