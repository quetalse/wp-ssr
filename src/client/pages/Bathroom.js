import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sagaFetchBathRoom } from '../../store/actions/bathroom';
import {allSagas} from "../../store/sagas";
import { Link, useParams } from "react-router-dom";
import HeaderMeta from "../components/HeaderMeta";

const routes = {
    sagaUrl: 'https://jsonplaceholder.typicode.com/photos',
    sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
}

const renderBathroom = (bathroom) => {

    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={bathroom.url}/>
                    </div>
                    <div className="card-content">
                        <h1 className="center"> {bathroom.title}</h1>
                        <p> status: {bathroom.url}</p>
                        <p> {bathroom.title}}</p>
                    </div>
                    <div className="card-action">
                        <Link to={`/`}>
                            Назад
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Bathroom = ({data, meta, sagaFetchBathRoom}) => {
    const { id } = useParams();
    useEffect(() => {
        if(!Object.keys(data).length || data.id !== Number(id) ){
            sagaFetchBathRoom({
                dataUrl: `${routes.sagaUrl}/${id}`,
                metaUrl: routes.sagaMetaUrl
            })
        }
    },[])

    return (
        <div className="center">
            <HeaderMeta meta={meta} />
            Баня:
            {renderBathroom(data)}
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
