import React, { useEffect, useState } from 'react';
import Skeleton from "../../components/skeletons/BathroomCard";
import HeaderMain from '../../components/HeaderMain';

import BathList from "./BathList";
import Form from "./Form";
import FooterMain from "../../components/FooterMain";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import {sagaFetchClassifiers, sagaFetchHome} from "../../../store/actions/home";
import DatePicker from "react-datepicker";
import AppSelect from "../../components/ui/AppSelect";
import {rootSaga} from "../../../store/sagas/root";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const _apiBase = process.env.__API_BASE__;
const serverSagaData = [
    {
        name: 'page',
        url: [{
            name: 'search',
            url: [
                {name: 'page',  url: `${_apiBase}/api/page/search`},
                {name: 'count', url: `${_apiBase}/api/page/search?count`}
            ]
        }]
    }
]

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData,
    clientSagaData: [
        // {name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=06826450'},
        ...serverSagaData
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories']
};


const Search = ({history}) => {

    const params = new URLSearchParams(history.location.search);
    const type = params.get('type');
    const metro = params.get('metro');
    // console.log('type', type)
    // console.log('metro', metro)

    const dispatch = useDispatch();
    const classifiers = useSelector(state => {
        return state.data.classifiers
    });
    useEffect(() => {
        if(!classifiers){
            const url = routes.clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[])


    return (
        <div className="" style={{marginTop: '50px'}}>
            <HeaderMain forPage="search" routes={routes.clientSagaData}/>
            <div className="row">
                <div className="col s3" style={{backgroundColor: '#90a4ae'}}>
                    {/*<Form routes={routes.clientSagaData} history={history}/>*/}
                </div>
                <div className="col s9">
                    <BathList route={`${process.env.__API_BASE__}/api/search?type[1]&metro[1]&purpose[1]`} count={7}/>
                </div>
            </div>
            <FooterMain forPage="search"/>
        </div>
    )
}

export default {
    component: Search,
    saga: allSagas.rootSaga,
    dataUrls: routes.dataUrls,
    serverSagaData: routes.serverSagaData,
    keysSsrIgnore: routes.keysSsrIgnore,
    stateKey: 'home'
}