import React, { Fragment } from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from "../../../components/skeletons/TopCategory";

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

export const AppCollectionForm = ({classifier}) => {

    const {data, error, loading} = useSelector(state => state.classifiers);
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
            {error && false}
            {(loading || !data) && <Skeleton/>}
            {data && collection(data[classifier])}
        </Fragment>
    )
}