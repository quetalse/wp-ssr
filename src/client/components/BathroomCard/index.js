import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

import { v4 as uuidv4 } from 'uuid';

export const BathroomCard = ({ bath }) => {

    const classifierTitles = ["aqua", "entertainment", "equipment", "location", "type", "purpose", "services", "metro"]
    const [title, typeId, metro, rating, price, url] = bath;
    const [additional, setAdditional] = useState(false);
    const showAdditional = () => {
        setAdditional(additional => !additional)
    }

    const {metro: classifierMetro} = useSelector(state => {
        let data = {};
        classifierTitles.forEach(classifierTitle => {
            if(state.classifiers[classifierTitle]) {
                data[classifierTitle] = state.classifiers[classifierTitle].data
            }
        })
        return data;
    });

    let showAdditionalText = additional ? 'Скрыть услуги' : 'Смотреть все услуги';
    return (
        <div className="row card bathroom-card">
            <div className="row bathroom-card-main">
                <div className="col s3 bathroom-card-head card-image">
                    <img className="" width="250" src={url}/>
                    {/*<span className="card-head card-price">300 р.</span>*/}
                    <span className="bathroom-card-rating">{rating} rate</span>
                </div>
                <div className="col s9 bathroom-card-content left-align">
                    <span className="content-price">{price} р.</span>
                    <p className="content-title">{title}</p>
                    <ul className="content-stations">
                        <li className="valign-wrapper station">
                            <Link to="google.com">Местоположение</Link>
                        </li>
                        <li className="valign-wrapper station">
                            {
                                metro.map(([idMetro, distance]) => (
                                    <span key={`${uuidv4()}`}>
                                        <Link to={`/bath${idMetro}`}>{classifierMetro[idMetro].title}</Link>-{distance}м.
                                    </span>))
                            }
                        </li>
                        <li className="valign-wrapper station">
                            <span>Вместимость 5 чел.</span>
                        </li>
                    </ul>
                    <ul className="content-icons">
                        <li data-tip="React-tooltip" className="content-icon">
                            <i className="material-icons">laptop</i>
                        </li>

                        <li className="content-icon">
                            <i className=" material-icons">laptop</i>
                        </li>
                        <li className="content-icon">
                            <i className=" material-icons">laptop</i>
                        </li>
                        <li className="content-icon">
                            <i className=" material-icons">laptop</i>
                        </li>
                        <li className="content-icon">
                            <i className=" material-icons">laptop</i>
                        </li>
                        <li className="content-icon">
                            <i className=" material-icons">laptop</i>
                        </li>
                    </ul>
                    <label onClick={showAdditional} className="content-type">{showAdditionalText}</label>
                </div>
            </div>
            {
                <div className={`row bathroom-card-additional ${additional && 'bathroom-card-additional_open'}`}>
                    <div className="col s9 offset-s3 left-align">
                        <div className="" style={{position: 'relative'}}>
                            <div className="row">
                                <div className="col s6" >
                                    <ul className="">
                                        <li className="valign-wrapper topic">
                                            Назначение:
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">На двоих</Link>
                                        </li>
                                        <li className="valign-wrapper topic">
                                            Аква-зона:
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">Бассейн</Link>
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">Купель</Link>
                                        </li>
                                        <li className="valign-wrapper topic">
                                            Услуги:
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">Массаж</Link>
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">Банщики</Link>
                                        </li>

                                    </ul>
                                </div>
                                <div className="col s6" >
                                    <ul className="">
                                        <li className="valign-wrapper topic">
                                            Развлечения:
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">Бильярд</Link>
                                        </li>
                                        <li className="valign-wrapper topic">
                                            Оборудование:
                                        </li>
                                        <li className="valign-wrapper station">
                                            <Link to="google.com">ТВ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}