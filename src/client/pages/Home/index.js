import React, { useEffect, useState } from 'react';

import Form from "./Form";
import RandomBath from "./RandomBath";
import TopCategory from "./TopCategory";
import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchHome} from "../../../store/actions/home";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData: [
        // { name: 'static', url: 'https://my.api.mockaroo.com/home.json?key=fa4e8ab0'},
        // {name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=fa4e8ab0'},
        {name: 'topCategories', url:'https://my.api.mockaroo.com/topCategories.json?key=fa4e8ab0'}
    ],
    dataUrls: [
        // '/api/page/home',
        'https://my.api.mockaroo.com/home.json?key=d9a5a7e0',
        'https://my.api.mockaroo.com/count.json?key=d9a5a7e0',
        // '/api/page/home?top-categories',
    ]
    // sagaMetaUrl: '/api/goods/meta'
}

const Home = ({data, sagaFetchHome}) => {

    // const {static: {title, description, h1, slogan, text}, count: {count}} = data;

    const [selected, setSelected] = useState({
        type: null,
        metro: null
    });

    useEffect(() => {

        // if(!data.length) {
        //     sagaFetchHome({
        //         dataUrls: routes.dataUrls,
        //         // metaUrl: routes.sagaMetaUrl
        //     })
        // }
        // const response = fetch("/api/users")
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log('users', json.users)
        //     })
    },[])

    const handleSelect = (selectedOption, select) => {
        setSelected( {
            ...selected,
            [select]: selectedOption
        } );
    };

    // const {h1, slogan, count, text, topCategories} = data;
    // console.log(data)

    return (
        Object.keys(data).length === 0 ? '' :
        <div className="center-align" style={{marginTop: '50px'}}>
            <div className="row">
                {/*<h1>{h1}</h1>*/}
                {/*<p>{slogan} {count}</p>*/}
            </div>
            {/*<Form/>*/}
            {/*<RandomBath/>*/}
            <div className="row top-categories">
                <TopCategory category="type"/>
                <TopCategory category="purpose"/>
                <TopCategory category="service"/>
            </div>
            <div className="row">
                {/*<p className="left-align">{text}</p>*/}
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
    component: connect(mapStateToProps, {sagaFetchHome})(Home),
    saga: allSagas.homeSaga,
    dataUrls: routes.dataUrls,
    serverSagaData: routes.serverSagaData
    // sagaMetaUrl: routes.sagaMetaUrl
}