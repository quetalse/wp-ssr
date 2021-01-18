import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaFetchHome } from '../../../store/actions/home';
import { sagaFetchTopCategories } from '../../../store/actions/topCategories';

import Skeleton from "../../components/skeletons/TopCategory";
import { AppCollection } from "../../components/UI/AppCollection";
import { _arraySkeleton } from "../../components/skeletons/_arraySkeleton";

export const TopCategories = ({routes}) => {
    const dispatch = useDispatch();

    const {data, error, loading} = useSelector(state => {
        // if(!state.data.classifiers) return {}
        return state.topCategories
    })

    useEffect(() => {
            if(!data && !loading){
                const url = routes.filter((route)=>{
                    return route.name === 'topCategories'
                });
                dispatch(sagaFetchTopCategories(url))
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
