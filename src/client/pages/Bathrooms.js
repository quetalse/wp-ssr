import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { sagaFetchBathRooms } from '../../store/actions/bathrooms';
import {allSagas} from "../../store/sagas";

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
        return <li key={bathroom.id}>{bathroom.name}</li>
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
    return {
        bathrooms: state.bathrooms.data
    }
};

export default {
    component: connect(mapStateToProps, {sagaFetchBathRooms})(Bathrooms),
    saga: allSagas.bathroomSaga
}
