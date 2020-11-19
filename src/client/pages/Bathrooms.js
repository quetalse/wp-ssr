import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRooms } from '../../store/actions/bathrooms';
import {allSagas} from "../../store/sagas";
import { Link } from "react-router-dom";

const head = (bathrooms) => {
    return (
        <Helmet>
            <title>{ `${bathrooms.length} Bathrooms Loaded`}</title>
            <meta property="og:title" content="Bathrooms App"/>
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

const Bathrooms = ({bathrooms, sagaFetchBathRooms}) => {
    // console.log('bathrooms', bathrooms)
    // useEffect(() => {
    //     console.log('INSADE')
    //     sagaFetchBathRooms()
    // },[])

    return (
        <div>
            {head(bathrooms)}
            Here list of bathrooms:
            <ul>{renderBathrooms(bathrooms)}</ul>
        </div>
    )
}

const mapStateToProps = (state) =>{
    // console.log('bathrooms', state)
    return {
        bathrooms: state.bathrooms.data
    }
};

export default {
    component: connect(mapStateToProps, {sagaFetchBathRooms})(Bathrooms),
    saga: allSagas.bathroomsSaga,
    sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
}
