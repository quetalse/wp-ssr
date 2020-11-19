import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRooms } from '../../store/actions/bathrooms';
import {allSagas} from "../../store/sagas";
import { useParams } from "react-router-dom";



const head = (bathrooms) => {
    return (
        <Helmet>
            <title>{ `${bathrooms.length} Bathrooms Loaded`}</title>
            <meta property="og:title" content="Bathrooms App"/>
        </Helmet>
    )
}

const renderBathroom = (bathroom) => {

    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={bathroom.url}/>
                            <span className="card-title">{bathroom.title}</span>
                    </div>
                    <div className="card-content">
                        <p>{bathroom.title}{bathroom.title}{bathroom.title}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Bathroom = ({bathroom, sagaFetchBathRooms}) => {
    const { id } = useParams();
    // console.log('bathrooms', bathrooms)
    // useEffect(() => {
    //     console.log('INSADE')
    //     sagaFetchBathRooms()
    // },[])

    return (
        <div>
            {head(bathroom)}
            Баня:
            <ul>{renderBathroom(bathroom)}</ul>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        bathroom: state.bathroom.data
    }
};

export default {
    component: connect(mapStateToProps, {sagaFetchBathRooms})(Bathroom),
    saga: allSagas.bathroomSaga,
    sagaURL: `https://jsonplaceholder.typicode.com/photos/6`
}
