import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaFetchHome } from '../../../store/actions/home';
import Skeleton from "../../components/skeletons/TopCategory";
import AppCollection from "../../components/ui/AppCollection";
import BathCard from "../../components/bathCards/BathCard";
import _arraySkeleton from "../../components/skeletons/_arraySkeleton";

const TopCategories = ({routes}) => {
    const dispatch = useDispatch();

    const collections = useSelector(state => {
        if(!state.data.topCategories){
            return null
        }
        return state.data.topCategories
    });

    useEffect(() => {
            if(!collections){
                const url = routes.filter((route)=>{
                    return route.name === 'topCategories'
                });
                dispatch(sagaFetchHome(url))
            }
        },[]
    );
    const renderTopCategories = () => {
        if (collections){
            return Object.entries(collections).map((category, index) => (
                <div className="col s4" key={index}>
                    <AppCollection  category={category[1]} topCategories={true}/>
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

export default TopCategories;