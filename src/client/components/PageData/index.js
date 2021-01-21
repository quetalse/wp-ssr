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
import { useLocation } from "react-router-dom";

export const PageData = ({children, clientSagaData}) => {

    const location = useLocation();
    const {pathname, search} = useLocation();
    const dispatch = useDispatch();
    const {data, error, loading} = useSelector(state => state.page);

    const routeRedux = useSelector(state => state.route);

    const route = `${pathname}${search}`

    console.log('route', route)
    console.log('routeRedux', routeRedux)

    //
    useEffect(() => {
        // if(!data && !loading){
        if(route !== routeRedux){
            const url = clientSagaData.filter((route) => {
                return route.name === 'page'
            });
            // console.log('URL', url)
            dispatch(sagaFetchPage(route))
        }
    },[data, loading])

    // useEffect(() => {
    //     console.log('location changed')
    //     console.log('location', location)
    //     dispatch(sagaFetchPage(route))
    // },[])

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