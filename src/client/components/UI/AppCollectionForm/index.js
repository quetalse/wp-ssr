import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from "../../../components/skeletons/TopCategory";
import {sagaFetchClassifier} from "../../../../store/actions/classifier";

const collectionItems = (array) => {
    return array.map((item, index) => (
        <li className="collection-item" key={index + 1}>
            <label>
                <input type="checkbox" className="filled-in"/>
                <span>{item[1]}</span>
            </label>
        </li>
    ));
};

export const AppCollectionForm = ({classifierTitle}) => {

    const dispatch = useDispatch();
    const classifier = useSelector( state => {
        if(!state.classifiers[classifierTitle]) return {}
        return state.classifiers[classifierTitle]
    });

    useEffect(() => {
        if(!classifier.data){
            dispatch(sagaFetchClassifier(classifierTitle))
        }
    },[])


    const collection = (classifier) => {
        return (
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{classifier.title || "Заголовок"}</h4>
                </li>
                {collectionItems(classifier)}
                <Link to={classifier.all || "/"}>Посмотреть все</Link>
            </ul>
        )
    }

    return (
        <Fragment>
            {classifier.error && false}
            {(classifier.loading || !classifier.data) && <Skeleton/>}
            {classifier.data && collection(classifier.data)}
        </Fragment>
    )
}