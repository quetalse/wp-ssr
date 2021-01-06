import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Skeleton from "../../components/skeletons/TopCategory";

const AppCollection = ({category, topCategories}) => {

    const listItems = (array) => {
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
    }

    return (
        !category ? <Skeleton/> : (
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{category.title || "Заголовок"}</h4>
                </li>
                {topCategories ? listItems(category.list) : listItems(category)}
                <Link to={category.all || "/"}>Посмотреть все</Link>
            </ul>
        )
    )
}

export default AppCollection;