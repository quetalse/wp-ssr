import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { sagaFetchHome } from '../../store/actions/home';

const HeaderMain = ({forPage, routes}) => {

    const dispatch = useDispatch();
    const {page, count} = useSelector(state => {
        if(!state.data.page[forPage]) return{}
        return state.data.page[forPage]
    });

    useEffect(() => {
        if(!page || !count){
            let url = routes.filter((route) => {
                return route.name === "page"
            });
            dispatch(sagaFetchHome(url))
        }
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