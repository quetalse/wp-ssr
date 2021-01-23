import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaFetchHome } from '../../../store/actions/home';
import { sagaFetchTopCategories } from '../../../store/actions/topCategories';

import Skeleton from "../../components/skeletons/TopCategory";
import { AppCollection } from "../../components/UI/AppCollection";
import { _arraySkeleton } from "../../components/skeletons/_arraySkeleton";
import { homeDataUrls } from '../../screensDataUrls'

const {clientSagaData} = homeDataUrls;
export const TopCategories = ({routes}) => {
    const dispatch = useDispatch();

    const {data, error, loading} = useSelector(state => {
        // if(!state.data.classifiers) return {}
        return state.topCategories
    })

    useEffect(() => {
            if(!data && !loading){
                const route = clientSagaData.topCategories
                dispatch(sagaFetchTopCategories(route))
            }
        },[]
    );

    const renderTopCategories = () => {
        if (data){
            return Object.entries(data).map((category, index) => (
                <div className="col s4" key={index}>
                    <AppCollection classifier={category[1]}/>
                </div>
            ))
        }else{
            return _arraySkeleton(3, () => (
                <div className="col s4">
                    <Skeleton/>
                </div>
            ))
        }
    }

    return (
        <Fragment>
            {renderTopCategories()}
        </Fragment>
    )
}
