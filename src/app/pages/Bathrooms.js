import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { sagaFetchBathRooms } from '../store/actions/bathrooms';

const renderBathrooms = (bathrooms) => {
    bathrooms.map( bathroom => {
        return <li key={bathroom.id}>{bathroom.name}</li>
    })
}

const Bathrooms = (bathrooms, sagaFetchBathRooms) => {

    useEffect(() => {
        console.log('INSADE')
        sagaFetchBathRooms()
    },[])

    return (
        <div>
            Here list of bathrooms:
            <ul>{renderBathrooms(bathrooms)}</ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    bathrooms: state.bathrooms.data
});

export default connect(mapStateToProps, {sagaFetchBathRooms})(Bathrooms)