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

    const routeData = useSelector(state => state.route);
    const isEqualRoute = routeData === pathname

    useEffect(() => {
        if(!isEqualRoute){
            dispatch(sagaFetchPage(pathname))
        }
    },[])

    const content = () => (
        <Fragment>
            <PageDataHeader/>
            {children}
            <PageDataFooter/>
        </Fragment>
    );


    // console.log('data !== null', data !== null)
    // console.log('isEqualRoute', isEqualRoute)

    return (
        <div className="content">
            <PageDataMeta/>
            {error && <AppError error={error}/>}
            {loading && <AppLoader/>}
            {data !== null && isEqualRoute && content()}
        </div>
    )
}