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

/** SELECTORS **/
import { getPageData, getRouteData } from "../../selectors";

export const PageData = ({children, clientSagaData}) => {

    const location = useLocation();
    const {pathname, search} = useLocation();
    const dispatch = useDispatch();

    const {data, error, loading} = useSelector(getPageData);
    const routeData = useSelector(getRouteData);

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