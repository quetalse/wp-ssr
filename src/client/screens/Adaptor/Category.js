import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { homeDataUrls } from '../../screensDataUrls'

/** ACTIONS **/
// import { sagaFetchClassifier } from "../../../store/actions/classifier";
import { sagaFetchPage } from "../../../store/actions/page";
import { dropField } from '../../../store/actions/page'

/** APP COMPONENTS **/
import { FilterPanelLeft } from "../../components/FilterPanelLeft";


/** LOCAL COMPONENTS **/
// import { HomeForm } from "./HomeForm";
// import { RandomBathList } from "./RandomBathList";
// import { TopCategories } from "./TopCategory";

import "./index.scss";
import {BathroomCardList} from "../Search/BathroomCardList";

const _apiBase = process.env.__API_BASE__;
const {clientSagaData, serverSagaData} = homeDataUrls;

export const Category = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    // const {data: classifiersData , error: classifiersError, loading: classifiersLoading} = useSelector(state => {
    //     // console.log('STATE', state)
    //     return state.classifiers
    // });

    // useEffect(() => {
    //     if(!classifiersData && !classifiersLoading){
    //         const url = clientSagaData.filter((route)=>{
    //             return route.name === 'classifiers'
    //         });
    //         dispatch(sagaFetchClassifiers(url))
    //     }
    // },[classifiersData, classifiersLoading])

    return (
        <div className="row">
            <div className="col s3">
                1{/*<FilterPanelLeft routes={clientSagaData}/>*/}
            </div>
            <div className="col s9">
               2 {/*<BathroomCardList route={`${process.env.__API_BASE__}/api/search?type[1]&metro[1]&purpose[1]`} count={7}/>*/}
            </div>
        </div>
    )
}

// export default {
//     component: Category,
//     serverSagaData: []
// }