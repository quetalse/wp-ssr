import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { excludeFieldState } from '../../../store/actions/home';

const TopCategory = ({category}) => {
    
    const dispatch = useDispatch();
    // useEffect(
    //     () => {
    //         console.log('typeof window',  typeof window === 'undefined')
    //         if (typeof window === 'undefined'){
    //
    //         }
    //     },
    //     [],
    // );

    const collection = useSelector(state => {
        return state.home.data.topCategories[category]
    })

    const listItems = collection.list.map((item, index) => (
        <li className="collection-item" key={index + 1}>
            <Link to={item.url}>{item.text}</Link>
        </li>
    ));

    if(category === 'service'){
        if(typeof window === 'undefined'){
            // dispatch(excludeFieldState('topCategories'));
        }
    }

    return (
        <div className="col s4">
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{collection.title}</h4>
                </li>
                {listItems}
                <Link to={collection.all}>Посмотреть все</Link>
            </ul>
        </div>
    )
}

export default TopCategory;