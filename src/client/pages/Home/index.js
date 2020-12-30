import React, { useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import Form from "./Form";
import RandomBathrooms from "./RandomBath";
import TopCategories from "./TopCategory";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchHome} from "../../../store/actions/home";
import Head from "../../components/Head";
import Foot from "../../components/Foot";
import HeaderMeta from "../../components/HeaderMeta";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const serverSagaData = [
    { name: 'page', url: 'https://my.api.mockaroo.com/home.json?key=06826450'},
    { name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=06826450'},
    // {name: 'types', url: ' http://localhost:3000/data/classifiers/type.json'},
    // {name: 'metro', url: 'https://my.api.mockaroo.com/metroSelect.json?key=06826450'},
    // {name: 'randomBathrooms', url: 'https://my.api.mockaroo.com/randomBathrooms.json?key=06826450'},
    {name: 'topCategories', url:'https://my.api.mockaroo.com/topCategories.json?key=06826450'}
]

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData,
    clientSagaData: [

        ...serverSagaData
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories']
};



const Home = ({history}) => {

    const dispatch = useDispatch();

    const home = useSelector(state => {
        if(!state.home.data.static){return null}
        return state.home.data.static
    });

    useEffect(() => {
        if(!home){
            const url = routes.serverSagaData.filter((route)=>{
                return route.name === 'static'
            });
            dispatch(sagaFetchHome(url))
        }
    },[])

    return (
        <React.Fragment>
            <HeaderMeta />
            <div className="center-align" style={{marginTop: '50px'}}>
                <Head/>
                <Form routes={routes.clientSagaData} history={history}/>
                <div className="row random-card-offers">
                    <RandomBathrooms routes={routes.clientSagaData}/>
                </div>
                <div className="row top-categories">
                    <TopCategories routes={routes.clientSagaData}/>
                </div>
                <Foot/>
            </div>
        </React.Fragment>
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