import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
import { sagaFetchClassifiers } from "../../../store/actions/classifiers";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
import { AppPage } from "../../components/AppPage";
import { AppMeta } from "../../components/AppMeta";
import { AppCrash } from "../../components/AppError";
import { AppLoader } from "../../components/AppLoader";
import { AppHeaderPage } from "../../components/AppHeaderPage";
import { AppFooterPage } from "../../components/AppFooterPage";

/** LOCAL COMPONENTS **/
import { Form } from "./Form";
import { RandomBathList } from "./RandomBathList";
import { TopCategories } from "./TopCategory";

import "./index.scss";

const {clientSagaData, serverSagaData} = homeDataUrls;
const Home = ({}) => {

    const dispatch = useDispatch();
    // const {data: pageData, error: pageError, loading: pageLoading} = useSelector(state => (state.page));
    const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
        // console.log('STATE', state)
        return state.classifiers
    });

    // useEffect(() => {
    //     if(!pageData && !pageLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'page'
    //         });
    //         dispatch(sagaFetchPage(url))
    //     }
    //     // return () => {
    //     //     console.log('drop')
    //     //     dispatch(dropField(['page']))
    //     // };
    // },[pageData, pageLoading])

    useEffect(() => {
        if(!classifiersData && !classifiersLoading){
            const url = clientSagaData.filter((route)=>{
                return route.name === 'classifiers'
            });
            dispatch(sagaFetchClassifiers(url))
        }
    },[classifiersData, classifiersLoading])


    return (
        // <Fragment>
        //     {pageError && (
        //         <Fragment>
        //             <AppMeta server={true} client={false} />
        //             <AppCrash error={pageError}/>
        //         </Fragment>
        //     )}
        //     {pageLoading && <AppLoader/>}
        //     {pageData !== null && (
        <AppPage clientSagaData={clientSagaData}>
            <Fragment>
                <AppMeta server={true} client={false} />
                <div className="center-align" style={{marginTop: '50px'}}>
                    <AppHeaderPage forPage="home" routes={clientSagaData}/>
                    <Form routes={clientSagaData}/>
                    <div className="row random-card-offers">
                        <RandomBathList routes={clientSagaData}/>
                    </div>
                    <div className="row top-categories">
                        <TopCategories routes={clientSagaData}/>
                    </div>
                    <AppFooterPage forPage="home"/>
                </div>
            </Fragment>
        </AppPage>

    // )
    //         }
    //     </Fragment>
    )
}

export default {
    component: Home,
    serverSagaData: serverSagaData
}