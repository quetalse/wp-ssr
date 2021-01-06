import React, { Fragment, useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import Form from "./Form";
import RandomBathList from "./RandomBathList";
import TopCategories from "./TopCategory";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchClassifiers } from "../../../store/actions/home";
import HeaderMain from "../../components/HeaderMain";
import FooterMain from "../../components/FooterMain";
import Meta from "../../components/Meta";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const _apiBase = process.env.__API_BASE__;

// Данные и формат для загрузки на сервере(формируем state на сервере)
const serverSagaData = [
    {
        name: 'page',
        url: [{
                name: 'home',
                url: [
                    {name: 'page',  url: `${_apiBase}/api/page/home`},
                    {name: 'count', url: `${_apiBase}/api/page/home?count`},
                ]
            }]
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
                {name: 'services', url: 'http://localhost:3000/data/classifiers/services.json'}
            ]
        },
        {name: 'randomBathrooms', url: `${_apiBase}/api/random-baths?count`},
        ...serverSagaData
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories']
};

const Home = ({history}) => {

    const dispatch = useDispatch();
    const classifiers = useSelector(state => {
        return state.data.classifiers
    });

    // console.log('classifiers', classifiers)

    useEffect(() => {
        if(!classifiers){
            const url = routes.clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[])

    return (
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