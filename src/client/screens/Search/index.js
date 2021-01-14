import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { searchDaraUrls } from '../../screensDataUrls';

/** ACTIONS **/
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";

/** APP COMPONENTS **/
import { AppMeta } from "../../components/AppMeta";
import { AppCrash } from "../../components/AppError";
import { AppLoader } from "../../components/AppLoader";
import { AppHeaderPage } from "../../components/AppHeaderPage";
import { AppFooterPage } from "../../components/AppFooterPage";

/** LOCAL COMPONENTS **/
import { Form } from "./Form";
import { BathList } from "./BathList";

import "./index.scss";

const {clientSagaData, serverSagaData} = searchDaraUrls;
const Search = ({history}) => {

    const params = new URLSearchParams(history.location.search);
    const type = params.get('type');
    const metro = params.get('metro');

    const dispatch = useDispatch();
    const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => {
        return state.page
    });
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });



    useEffect(() => {
        if(!pageData && !pageLoading){
            const url = clientSagaData.filter((route)=>{
                return route.name === 'page'
            });
            dispatch(sagaFetchPage(url))
        }
    },[pageData, pageLoading])

    useEffect(() => {
        if(!classifiersData && !classifiersLoading){
            const url = clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[classifiersData, classifiersLoading])

    return (
        <Fragment>
            {pageError && (
                <Fragment>
                    <AppMeta/>
                    <AppCrash error={pageError}/>
                </Fragment>
            )}
            {pageLoading && <AppLoader/>}
            {pageData !== null && (
                <Fragment>
                    <div className="" style={{marginTop: '50px'}}>
                        <AppHeaderPage forPage="search" routes={clientSagaData}/>
                        <div className="row">
                            <div className="col s3">
                                <Form routes={clientSagaData} history={history}/>
                            </div>
                            <div className="col s9">
                                <BathList route={`${process.env.__API_BASE__}/api/search?type[1]&metro[1]&purpose[1]`} count={7}/>
                            </div>
                        </div>
                        <AppFooterPage forPage="search"/>
                    </div>
                </Fragment>)
            }
        </Fragment>
    )
}

export default {
    component: Search,
    serverSagaData: serverSagaData,
}