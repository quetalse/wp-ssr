import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { sagaFetchHome } from '../../store/actions/home';

const HeaderMain = ({routes}) => {

    const dispatch = useDispatch();
    const {page, count} = useSelector(state => state.home.data);

    useEffect(() => {
        if(!page || !count){
            let url = routes.filter((route) => {
                return route.name === 'page' || route.name === 'count'
            });
            dispatch(sagaFetchHome(url))
        }
    },[]);

    // const =

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