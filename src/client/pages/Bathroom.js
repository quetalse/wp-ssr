import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRoom } from '../../store/actions/bathroom';
import {allSagas} from "../../store/sagas";
import { useParams } from "react-router-dom";
import HeaderMeta from "../components/HeaderMeta";

const routes = {
    sagaUrl: 'https://jsonplaceholder.typicode.com/photos',
    sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
}

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

const Bathroom = ({data, meta, sagaFetchBathRoom}) => {
    const { id } = useParams();
    useEffect(() => {
        console.log('data', data)
        if(!Object.keys(data).length){
            sagaFetchBathRoom({
                dataUrl: `${routes.sagaUrl}/${id}`,
                metaUrl: routes.sagaMetaUrl
            })
        }
    },[])

    return (
        <div>
            <HeaderMeta meta={meta} />
            Баня:
            <ul>{renderBathroom(data)}</ul>
        </div>
    )
}

const mapStateToProps = (state) =>{

    return {
        data: state.bathroom.data,
        meta: state.bathroom.meta
    }
};

export default {
    component: connect(mapStateToProps, {sagaFetchBathRoom})(Bathroom),
    saga: allSagas.bathroomSaga,
    sagaUrl: routes.sagaUrl,
    sagaMetaUrl: routes.sagaMetaUrl
}
