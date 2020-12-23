import React, { useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import Form from "./Form";
import RandomBath from "./RandomBath";
import TopCategories from "./TopCategory";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchHome} from "../../../store/actions/home";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData: [
        { name: 'static', url: 'https://my.api.mockaroo.com/home.json?key=fa4e8ab0'},
        // {name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=fa4e8ab0'},
        {name: 'types', url: 'https://my.api.mockaroo.com/types.json?key=fa4e8ab0'},
        {name: 'metro', url: 'https://my.api.mockaroo.com/metro.json?key=fa4e8ab0'},
        {name: 'topCategories', url:'https://my.api.mockaroo.com/topCategories.json?key=fa4e8ab0'}
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories' ]
}

const Home = ({}) => {
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


    let h1 = home ? home.h1 : <Skeleton count={1} width={160}/>;
    let slogan = home ? home.slogan : <Skeleton count={2}/>;
    let text = home ? home.text : <Skeleton count={4}/>;

    return (<div className="center-align" style={{marginTop: '50px'}}>
            <div className="row">
                <h1>{h1}</h1>
                <p>{slogan}</p>
            </div>
            <Form routes={routes.serverSagaData}/>
            {/*<RandomBath/>*/}
            <div className="row top-categories">
                <TopCategories routes={routes.serverSagaData}/>
            </div>
            <div className="row">
                <p className="left-align">{text}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    // console.log('home', state)
    return {
        data: state.home.data,
        // meta: state.bathrooms.meta
    }
};

export default {
    // component: connect(mapStateToProps, {sagaFetchHome})(Home),
    component: Home,
    saga: allSagas.homeSaga,
    dataUrls: routes.dataUrls,
    serverSagaData: routes.serverSagaData,
    keysSsrIgnore: routes.keysSsrIgnore,
    stateKey: 'home'
    // sagaMetaUrl: routes.sagaMetaUrl
}