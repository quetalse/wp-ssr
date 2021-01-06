import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { dropField, sagaFetchHome } from '../../store/actions/home';

const HeaderMain = ({forPage, routes}) => {

    const dispatch = useDispatch();
    const {page, count} = useSelector(state => {
        if(!state.data.page) return {}
        console.log('STATE, ',forPage, state)
        return state.data.page
    });

    useEffect(() => {
        if(!page || !count){
            let url = routes.filter((route) => {
                return route.name === "page"
            });
            dispatch(sagaFetchHome(url))
        }
        return function() {
            dispatch(dropField(['page']))
        };
    },[]);

    return (
        <div className="row">
            <h1>{page ? page.h1 : <Skeleton count={1} width={160}/>}</h1>
            <p>{page ? page.slogan : <Skeleton count={2}/>}
                &ensp;<span>{count ? count.count : ''}</span>
            </p>
        </div>
    )
}

export default HeaderMain;