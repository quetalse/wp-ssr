import React, { useState } from 'react';
import {Link} from "react-router-dom";

const AppCollection = ({category, topCategories}) => {

    const listItemContent = (url, text) => {
        if(topCategories){
            return <Link to={url}>{text}</Link>
        }else{
            return (
                <label>
                    <input type="checkbox" className="filled-in"/>
                    <span>{text}</span>
                </label>
            )
        }
    }

    const listItems = () => {
        return category.list.map((item, index) => (
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
        <div className="col s4">
            <ul className="collection with-header">
                <li className="collection-header" key={0}>
                    <h4>{category.title}</h4>
                </li>
                {listItems()}
                <Link to={category.all}>Посмотреть все</Link>
            </ul>
        </div>
    )
}

export default AppCollection;