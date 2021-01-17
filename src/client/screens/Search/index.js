import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { searchDaraUrls } from '../../screensDataUrls';
import { useLocation } from 'react-router-dom'

/** ACTIONS **/
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";

/** HOC COMPONENTS **/
import { PageInfo } from "../../components/HOC/PageInfo";

/** APP COMPONENTS **/
import { PageMeta } from "../../components/PageMeta";
import { PageInfoHeader } from "../../components/PageInfoHeader";
import { PageInfoFooter } from "../../components/PageInfoFooter";

/** LOCAL COMPONENTS **/
import { SearchForm } from "./SearchForm";
import { BathroomCardList } from "./BathroomCardList";

import "./index.scss";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = searchDaraUrls;

const Search = ({history}) => {

    const {pathname, search} = useLocation();
    // console.log('location', location);

    const searchPage = [{
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page${pathname}${search}`},
            {name: 'count', url: `${_apiBase}/api/page/search?count`}
        ]
    }]

    const params = new URLSearchParams(history.location.search);
    const type = params.get('type');
    const metro = params.get('metro');

    const dispatch = useDispatch();
    // const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => {
    //     return state.page
    // });
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });

    // useEffect(() => {
    //     if(!pageData && !pageLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'page'
    //         });
    //         dispatch(sagaFetchPage(url))
    //     }
    // },[pageData, pageLoading])

    useEffect(() => {
        if(!classifiersData && !classifiersLoading){
            const url = clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[classifiersData, classifiersLoading])

    return (
        // <Fragment>
        //     {pageError && (
        //         <Fragment>
        //             <AppMeta/>
        //             <AppCrash error={pageError}/>
        //         </Fragment>
        //     )}
        //     {pageLoading && <AppLoader/>}
        //     {pageData !== null && (
        <PageInfo clientSagaData={searchPage}>
            <Fragment>
                <PageMeta/>
                <div className="" style={{marginTop: '50px'}}>
                    <PageInfoHeader forPage="search" routes={clientSagaData}/>
                    <div className="row">
                        <div className="col s3">
                            <SearchForm routes={clientSagaData} history={history}/>
                        </div>
                        <div className="col s9">
                            <BathroomCardList route={`${process.env.__API_BASE__}/api/search?type[1]&metro[1]&purpose[1]`} count={7}/>
                        </div>
                    </div>
                    <PageInfoFooter forPage="search"/>
                </div>
            </Fragment>
        </PageInfo>
    // )
    //         }
    //     </Fragment>
    )
}

export default {
    component: Search,
    serverSagaData: serverSagaData,
}