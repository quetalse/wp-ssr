import React, { Fragment } from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from "../../../components/skeletons/TopCategory";

export const AppCollection = ({classifier, topCategories}) => {
    let render;
    if (!topCategories){
        const {data, error, loading} = useSelector(state => {
            return state.classifiers
        });

        render = () => {
            return (
                <Fragment>
                    {error && false}
                    {loading && <Skeleton/>}
                    {data && collection(data[classifier])}
                </Fragment>
            )
        }
    }else{
        render = () => {
            return (
                <Fragment>
                    {collection(classifier)}
                </Fragment>
            )
        }
    }

    const collectionItems = (array) => {
        return array.map((item, index) => (
            <li className="collection-item" key={index + 1}>
                {topCategories ? (<Link to={item.url}>{item.text}</Link>) :
                    (
                        <label>
                            <input type="checkbox" className="filled-in"/>
                            <span>{item[1]}</span>
                        </label>
                    )
                }
            </li>
        ));
    };

    const collection = (classifier) => {
        return (
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{classifier.title || "Заголовок"}</h4>
                </li>
                {topCategories ? collectionItems(classifier.list) : collectionItems(classifier)}
                <Link to={classifier.all || "/"}>Посмотреть все</Link>
            </ul>
        )
    }

    return (
        <Fragment>
            {render()}
        </Fragment>
    )
}