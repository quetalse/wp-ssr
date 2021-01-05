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
import { sagaFetchHome} from "../../../store/actions/home";
import DatePicker from "react-datepicker";
import AppSelect from "../../components/ui/AppSelect";
import {rootSaga} from "../../../store/sagas/root";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const typesOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const metroOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

const serverSagaData = [
    // { name: 'page', url: 'https://my.api.mockaroo.com/home.json?key=06826450'},
    // { name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=06826450'},
    {name: 'types', url: ' http://localhost:3000/data/classifiers/type.json'},
    // {name: 'randomBathrooms', url: 'https://my.api.mockaroo.com/randomBathrooms.json?key=06826450'},
    // {name: 'topCategories', url:'https://my.api.mockaroo.com/topCategories.json?key=06826450'}
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

    const home = useSelector(state => {
        return state.home.data.static
    });



    useEffect(() => {
        // if(!home){
        //     const url = routes.serverSagaData.filter((route)=>{
        //         return route.name === 'static'
        //     });
        //     dispatch(sagaFetchHome(url))
        // }
    },[])


    return (
        <div className="" style={{marginTop: '50px'}}>
            <HeaderMain routes={routes.clientSagaData}/>
            <div className="row">
                <div className="col s3" style={{backgroundColor: '#90a4ae'}}>
                    <Form routes={routes.clientSagaData} history={history}/>
                </div>
                <div className="col s9">
                    <BathList/>
                </div>
            </div>
            <FooterMain/>
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