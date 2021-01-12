import React, { Fragment, useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import Form from "./Form";
import RandomBathList from "./RandomBathList";
import TopCategories from "./TopCategory";
import { AppLoader } from "../../components/AppLoader";
import { AppCrash } from "../../components/AppError";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";
import { HeaderMain } from "../../components/HeaderMain";
import FooterMain from "../../components/FooterMain";
import Meta from "../../components/Meta";
import { dropField } from '../../../store/actions/page'
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const _apiBase = process.env.__API_BASE__;

// Данные и формат для загрузки на сервере(формируем state на сервере)
const serverSagaData = [
    {
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page/home`},
            {name: 'count', url: `${_apiBase}/api/page/home?count`},
        ]
    },
    {name: 'topCategories', url: `${_apiBase}/api/page/home?top-categories`}
]

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData,
    clientSagaData: [
        {
            name: 'classifiers',
            url:[
                {name: 'types', url: 'http://localhost:3000/data/classifiers/type.json'},
                {name: 'metro', url: 'http://localhost:3000/data/classifiers/metro.json'},
                {name: 'purpose', url: 'http://localhost:3000/data/classifiers/purpose.json'},
                {name: 'services', url: 'http://localhost:3000/data/classifiers/services.json'},
                {name: 'aqua', url: 'http://localhost:3000/data/classifiers/aqua.json'},
                {name: 'entertainment', url: 'http://localhost:3000/data/classifiers/entertainment.json'}
            ]
        },
        {name: 'randomBathrooms', url: `${_apiBase}/api/random-baths?count`},
        ...serverSagaData
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories']
};

const Home = ({history}) => {

    console.log('history.location.pathname', history.location.pathname)

    const dispatch = useDispatch();
    const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });

    useEffect(() => {
        if(!pageData && !pageLoading){
            const url = routes.clientSagaData.filter((route)=>{
                return route.name === 'page'
            });
            dispatch(sagaFetchPage(url))
        }
    },[])

    useEffect(() => {
        if(!classifiersData && !classifiersLoading){
            const url = routes.clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[])

    useEffect(() => {
        return () => {
            console.log('drop')
            dispatch(dropField(['page']))
            // console.log(' drop page', page)
        };
    }, [])

    return (
        <Fragment>
            {pageError && (
                <Fragment>
                    <Meta server={true} client={false} />
                    <AppCrash error={pageError}/>
                </Fragment>
            )}
            {pageLoading && <AppLoader/>}
            {pageData !== null && (
                <Fragment>
                    <Meta server={true} client={false} />
                    <div className="center-align" style={{marginTop: '50px'}}>
                        <HeaderMain forPage="home" routes={routes.clientSagaData}/>
                        <Form routes={routes.clientSagaData} history={history}/>
                        <div className="row random-card-offers">
                            <RandomBathList routes={routes.clientSagaData}/>
                        </div>
                        <div className="row top-categories">
                            <TopCategories routes={routes.clientSagaData}/>
                        </div>
                        <FooterMain forPage="home"/>
                    </div>
                </Fragment>)
            }
        </Fragment>
    )
}

export default {
    component: Home,
    saga: allSagas.rootSaga,
    dataUrls: routes.dataUrls,
    serverSagaData: routes.serverSagaData,
    keysSsrIgnore: routes.keysSsrIgnore,
    stateKey: 'home'
    // sagaMetaUrl: routes.sagaMetaUrl
}