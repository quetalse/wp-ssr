import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { dropField, sagaFetchHome } from '../../store/actions/home';
import {Helmet} from "react-helmet-async";

export const AppHeaderPage = ({forPage, routes}) => {

    const dispatch = useDispatch();
    const {data, error, loading} = useSelector(state => (state.page));

    // useEffect(() => {
    //     console.log('load', forPage)
    //     console.log('load page', page)
    //
    //     if(!page || !count){
    //         let url = routes.filter((route) => {
    //             return route.name === "page"
    //         });
    //         dispatch(sagaFetchHome(url))
    //     }
    //     return function() {
    //         console.log('drop', forPage)
    //         dispatch(dropField(['page']))
    //         console.log(' drop page', page)
    //     };
    // },[]);

    const renderHeaderMain = (page, count) => {
        return (
            <Fragment>
                <h1>{page ? page.h1 : <Skeleton count={1} width={160}/>}</h1>
                <p>{page ? page.slogan : <Skeleton count={2}/>}
                    &ensp;<span>{count ? count.count : ''}</span>
                </p>
            </Fragment>
        )
    }

    return (
        <div className="row">
            {error && <h1>&#129298; Error!</h1> }
            {loading && renderHeaderMain(null, null)}
            {data !== null && renderHeaderMain(data.page, data.count)}
        </div>
    )
}