import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from "../../../components/skeletons/TopCategory";
import {sagaFetchClassifier} from "../../../../store/actions/classifier";

const collectionItems = (classifierObj) => {
    let result = [];

    for (let id in classifierObj) {
        result.push(
        <li className="collection-item" key={`${id}`}>
            <label>
                <input type="checkbox" className="filled-in"/>
                <span>{classifierObj[id].title}</span>
            </label>
        </li>)
    }
    return result
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
                <li className="collection-header">
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