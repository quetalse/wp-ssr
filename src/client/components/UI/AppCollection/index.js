import React, { Fragment } from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from "../../../components/skeletons/TopCategory";

const collectionItems = (array) => {
    return array.map((item, index) => (
        <li className="collection-item" key={index + 1}>
            <Link to={item.url}>{item.text}</Link>)
        </li>
    ));
};

export const AppCollection = ({classifier}) => {

    const collection = (classifier) => (
        <ul className="collection with-header">
            <li className="collection-header" key={0}>
                <h4>{classifier.title || "Заголовок"}</h4>
            </li>
            {collectionItems(classifier.list)}
            <Link to={classifier.all || "/"}>Посмотреть все</Link>
        </ul>
    )

    return (
        <Fragment>
            {collection(classifier)}
        </Fragment>
    )
}