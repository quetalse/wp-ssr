import React, {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { HeaderMain } from '../../components/HeaderMain';

import BathList from "./BathList";
import Form from "./Form";
import FooterMain from "../../components/FooterMain";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";

import { allSagas } from "../../../store/sagas";
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import DatePicker from "react-datepicker";
import AppSelect from "../../components/ui/AppSelect";
import {rootSaga} from "../../../store/sagas/root";
import Meta from "../../components/Meta";
import {AppCrash} from "../../components/AppError";
import {AppLoader} from "../../components/AppLoader";
import RandomBathList from "../Home/RandomBathList";
import TopCategories from "../Home/TopCategory";
import {sagaFetchPage} from "../../../store/actions/page";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const _apiBase = process.env.__API_BASE__;
const serverSagaData = [
    {
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page/search`},
            {name: 'count', url: `${_apiBase}/api/page/search?count`}
        ]
    }
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
    const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });

    console.log('pageData', pageData)

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


    return (
        <Fragment>
            {pageError && (
                <Fragment>
                    <Meta/>
                    <AppCrash error={pageError}/>
                </Fragment>
            )}
            {pageLoading && <AppLoader/>}
            {pageData !== null && (
                <Fragment>
                    <div className="" style={{marginTop: '50px'}}>
                        <HeaderMain forPage="search" routes={routes.clientSagaData}/>
                        <div className="row">
                            <div className="col s3">
                                <Form routes={routes.clientSagaData} history={history}/>
                            </div>
                            <div className="col s9">
                                <BathList route={`${process.env.__API_BASE__}/api/search?type[1]&metro[1]&purpose[1]`} count={7}/>
                            </div>
                        </div>
                        <FooterMain forPage="search"/>
                    </div>
                </Fragment>)
            }
        </Fragment>
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