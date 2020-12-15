import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRooms } from '../../store/actions/bathrooms';
import {allSagas} from "../../store/sagas";
import { Link } from "react-router-dom";

import HeaderMeta from "../components/HeaderMeta";

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/goods',
    sagaMetaUrl: '/api/goods/meta'
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

const Bathrooms = ({data, meta, sagaFetchBathRooms}) => {
    // console.log('bathrooms', bathrooms)
    useEffect(() => {
        if(!data.length) {
            sagaFetchBathRooms({
                dataUrl: routes.sagaUrl,
                metaUrl: routes.sagaMetaUrl
            })
        }

        // const response = fetch("/api/users")
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log('users', json.users)
        //     })

    },[])

    return (
      <div className="center">
        <HeaderMeta meta={meta} />
        <h1>{meta.name}</h1>
        {/*Here list of bathrooms:*/}
        <ul>{renderBathrooms(data)}</ul>
        <p>{meta.description}</p>
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
    sagaUrl: routes.sagaUrl,
    sagaMetaUrl: routes.sagaMetaUrl
}
