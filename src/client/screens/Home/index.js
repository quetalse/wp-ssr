import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** HOC COMPONENTS **/
import { PageInfo } from "../../components/HOC/PageInfo";

/** APP COMPONENTS **/
import { PageMeta } from "../../components/PageMeta";
// import { AppError } from "../../components/UI/AppError";
// import { AppLoader } from "../../components/AppLoader";
import { PageInfoHeader } from "../../components/PageInfoHeader";
import { PageInfoFooter } from "../../components/PageInfoFooter";

/** LOCAL COMPONENTS **/
import { HomeForm } from "./HomeForm";
import { BathroomCardRandomList } from "./BathroomCardRandomList";
import { TopCategories } from "./TopCategories";

import "./index.scss";

const {clientSagaData, serverSagaData} = homeDataUrls;
const Home = () => {

    const dispatch = useDispatch();
    // const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
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
    //     // return () => {
    //     //     console.log('drop')
    //     //     dispatch(dropField(['page']))
    //     // };
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
        <PageInfo clientSagaData={clientSagaData}>
            <Fragment>
                <PageMeta/>
                <div className="center-align" style={{marginTop: '50px'}}>
                    <PageInfoHeader forPage="home" routes={clientSagaData}/>
                    <HomeForm routes={clientSagaData}/>
                    <div className="row random-card-offers">
                        <BathroomCardRandomList routes={clientSagaData}/>
                    </div>
                    <div className="row top-categories">
                        <TopCategories routes={clientSagaData}/>
                    </div>
                    <PageInfoFooter forPage="home"/>
                </div>
            </Fragment>
        </PageInfo>
    )
}

export default {
    component: Home,
    serverSagaData: serverSagaData
}