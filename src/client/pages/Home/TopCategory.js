import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaFetchHome } from '../../../store/actions/home';
import Skeleton from "./skeletons/TopCategory";

const TopCategories = ({routes}) => {
    const dispatch = useDispatch();

    const collections = useSelector(state => {
        if(!state.home.data.topCategories){
            return null
        }
        return state.home.data.topCategories
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

    return ( !collections ?
            <React.Fragment>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </React.Fragment>
            :
            <React.Fragment>
                <TopCategory category={collections['type']}/>
                <TopCategory category={collections['purpose']}/>
                <TopCategory category={collections['service']}/>
            </React.Fragment>
    )
}

const TopCategory = ({category}) => {

    const listItems = () => {
        return category.list.map((item, index) => (
            <li className="collection-item" key={index + 1}>
                <Link to={item.url}>{item.text}</Link>
            </li>
        ));
    }

    return (
        <div className="col s4">
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{category.title}</h4>
                </li>
                {listItems()}
                <Link to={category.all}>Посмотреть все</Link>
            </ul>
        </div>
    )
}

export default TopCategories;