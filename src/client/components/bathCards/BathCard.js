import React, { useEffect, useState } from 'react';``
import {Link} from 'react-router-dom';

const BathCard = () => {

    const [additional, setAdditional] = useState(false);
    const showAdditional = () => {
        setAdditional(!additional)
    }

    let showAdditionalText = additional ? 'Скрыть услуги' : 'Смотреть все услуги';

    return (
        <div className="row card bathroom-card">
            <div className="row bathroom-card-main">
                <div className="col s3 bathroom-card-head card-image">
                    <img className="" width="250" src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                    {/*<span className="card-head card-price">300 р.</span>*/}
                    <span className="bathroom-card-rating">5 rate</span>
                </div>
                <div className="col s9 bathroom-card-content left-align">
                    <span className="content-price">300 р.</span>
                    <p className="content-title">Название</p>
                    <ul className="content-stations">
                        <li className="valign-wrapper station">
                            <Link to="google.com">Посмотреть все</Link>
                        </li>
                        <li className="valign-wrapper station">
                            <Link to="google.com">Посмотреть все</Link>
                            <Link to="google.com">Посмотреть все</Link>
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

export default BathCard;