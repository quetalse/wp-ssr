import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const BathroomCardRandom = ({bath: [title, idTypes, metro, rating, price, url]}) => {

    const classifierTitles = ["type", "metro"]
    const classifiers = useSelector(state => {
        let data = {};
        classifierTitles.map((classifierTitle) => {
            if(state.classifiers[classifierTitle]) {
                data[classifierTitle] = state.classifiers[classifierTitle].data
            }
        })
        return data;
    });

    return (
        <div className="card">
            <div className="card-image">
                <img src={url}/>
                <span className="card-head card-price">{price} р.</span>
                <span className="card-head card-mark">{rating}</span>
            </div>
            <div className="card-content left-align">
                <Link to={url} className="content-title">{title}</Link>
                <ul className="content-type">
                    {
                        idTypes.map(id => (<li key={`${id}`}>{classifiers.type[id].title}</li>))
                    }
                </ul>
                <ul className="content-stations">
                    {metro.map(([idMetro, distance]) => {
                        return (
                            <li key={`${idMetro}`} className="valign-wrapper station">{classifiers.metro[idMetro].title} ({distance})
                                <img
                                    src="app/images/icons/metro.png"
                                    className="secondary-content" width="10px"/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}