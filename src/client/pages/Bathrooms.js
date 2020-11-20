import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRooms } from '../../store/actions/bathrooms';
import {allSagas} from "../../store/sagas";
import { Link } from "react-router-dom";

import HeaderMeta from "../components/HeaderMeta";

const head = (meta) => {
    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta property="og:title" content={meta.title}/>
            <meta property="og:description" content={meta.description}/>
            <meta property="og:keywords" content={meta.keywords}/>
            <meta name="keywords" content={meta.keywords} />
            <meta property="og:site_name" content={meta.name}/>
        </Helmet>
    )
}

const renderBathrooms = (bathrooms) => {

    return bathrooms.map( bathroom => {
        return (
            <li key={bathroom.id}>
                <div>
                    <img src={bathroom.thumbnailUrl} alt=""/>
                    <p>{bathroom.title}</p>
                    <Link to={`/bathrooms/${bathroom.id}`}>
                        Перейти
                        {/*<button onClick={() => console.log(bathroom.id)}>*/}
                        {/*    Просмотр*/}
                        {/*</button>*/}
                    </Link>
                </div>
            </li>
        )
    })
}

const Bathrooms = ({data, meta}) => {
    // console.log('bathrooms', bathrooms)
    // useEffect(() => {
    //     console.log('INSADE')
    //     sagaFetchBathRooms()
    // },[])

    return (
      <div>
        <HeaderMeta meta={meta} />
        Here list of bathrooms:
        <ul>{renderBathrooms(data)}</ul>
      </div>
    )
}

const mapStateToProps = (state) =>{
    // console.log('bathrooms', state)
    return {
        data: state.bathrooms.data,
        meta: state.bathrooms.meta
    }
};

export default {
    component: connect(mapStateToProps, {sagaFetchBathRooms})(Bathrooms),
    saga: allSagas.bathroomsSaga,
    sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
}
