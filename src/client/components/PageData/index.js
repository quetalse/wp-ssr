import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

/** ACTIONS **/
import { sagaFetchPage } from "../../../store/actions/page";

/** APP COMPONENTS **/
import { PageDataMeta } from "./PageDataMeta";
import { AppError } from "../UI/AppError";
import { AppLoader } from "../UI/AppLoader";
import { PageDataHeader } from "./PageDataHeader";
import { PageDataFooter } from "./PageDataFooter";
import {useLocation} from "react-router-dom";

export const PageData = ({children, clientSagaData}) => {

    const {pathname, search} = useLocation();
    const dispatch = useDispatch();
    const {data, error, loading} = useSelector(state => state.page);

    const route = `${pathname}${search}`
    // console.log('pathname, search', pathname, search)


    useEffect(() => {
        if(!data && !loading){
            const url = clientSagaData.filter((route) => {
                return route.name === 'page'
            });
            // console.log('URL', url)
            dispatch(sagaFetchPage(route))
        }
    },[data, loading])

    const content = () => (
        <Fragment>
            <PageDataHeader/>
            {children}
            <PageDataFooter/>
        </Fragment>
    );

    return (
        <div className="content">
            <PageDataMeta/>
            {error && <AppError error={error}/>}
            {loading && <AppLoader/>}
            {data !== null && content()}
        </div>
    )
}