import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

/** ACTIONS **/
import { sagaFetchPage } from "../../../../store/actions/page";

/** APP COMPONENTS **/
import { PageMeta } from "../../PageMeta";
import { AppError } from "../../UI/AppError";
import { AppLoader } from "../../UI/AppLoader";

export const PageInfo = ({children, clientSagaData}) => {

    const dispatch = useDispatch();
    const {data, error, loading} = useSelector(state => state.page);

    useEffect(() => {
        if(!data && !loading){
            const url = clientSagaData.filter((route) => {
                return route.name === 'page'
            });
            dispatch(sagaFetchPage(url))
        }
    },[data, loading])

    return (
        <Fragment>
            {error && (
                <Fragment>
                    <PageMeta/>
                    <AppError error={error}/>
                </Fragment>
            )}
            {loading && <AppLoader/>}
            {data !== null && (
                <Fragment>
                    {children}
                </Fragment>)
            }
        </Fragment>
    )
}