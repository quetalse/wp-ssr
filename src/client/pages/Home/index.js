import React, { useState } from 'react';

import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect } from "react-redux";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/goods',
    sagaMetaUrl: '/api/goods/meta'
}

const typesOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const metroOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]


const Home = () => {

    const [selected, setSelected] = useState({
        type: null,
        metro: null
    });

    const handleSelect = (selectedOption, select) => {
        setSelected( {
            ...selected,
            [select]: selectedOption
        } );
    };

    return (
        <div className="center-align" style={{marginTop: '50px'}}>
            <div className="row">
                <h1>Заголовок</h1>
                <p> Слоган слоган слоган слоган слоган слоган слоган слоган</p>
            </div>
            <div className="row inputs">
                <div className="col s8 input-field">
                    <div className="input-tool">
                        <label>Тип</label>
                    </div>
                    <div className="input-tool">
                        <label>Метро</label>
                        {/*<Select*/}
                        {/*    styles={customStyles}*/}
                        {/*    height="3rem"*/}
                        {/*    placeholder="Выбор метро..."*/}
                        {/*    value={selected.metro}*/}
                        {/*    onChange={(selectedOption) => handleSelect(selectedOption, 'metro')}*/}
                        {/*    options={metroOptions}*/}
                        {/*/>*/}
                    </div>
                </div>
                <div className="col s4 input-field">
                    <button className="btn waves-effect waves-light input-tool" type="submit" name="action">
                        Поиск <span>(5)</span>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="random-card-offers">
                    <div className="card">
                        <div className="card-image">
                            <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                            <span className="card-head card-price">300 р</span>
                            <span className="card-head card-mark">5</span>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title">Название</p>
                            <p className="content-type">Тип 4</p>
                            <ul className="content-stations">
                                <li className="valign-wrapper station">
                                    Метро 1 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                                <li className="valign-wrapper station">
                                    Метро 2 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                            <span className="card-head card-price">300 р</span>
                            <span className="card-head card-mark">5</span>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title">Название</p>
                            <p className="content-type">Тип 4</p>
                            <ul className="content-stations">
                                <li className="valign-wrapper station">
                                    Метро 1 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                                <li className="valign-wrapper station">
                                    Метро 2 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                            <span className="card-head card-price">300 р</span>
                            <span className="card-head card-mark">5</span>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title">Название</p>
                            <p className="content-type">Тип 4</p>
                            <ul className="content-stations">
                                <li className="valign-wrapper station">
                                    Метро 1 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                                <li className="valign-wrapper station">
                                    Метро 2 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                            <span className="card-head card-price">300 р</span>
                            <span className="card-head card-mark">5</span>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title">Название</p>
                            <p className="content-type">Тип 4</p>
                            <ul className="content-stations">
                                <li className="valign-wrapper station">
                                    Метро 1 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                                <li className="valign-wrapper station">
                                    Метро 2 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                            <span className="card-head card-price">300 р</span>
                            <span className="card-head card-mark">5</span>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title">Название</p>
                            <p className="content-type">Тип 4</p>
                            <ul className="content-stations">
                                <li className="valign-wrapper station">
                                    Метро 1 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                                <li className="valign-wrapper station">
                                    Метро 2 <img className="secondary-content" width="10px"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row categories">
                <div className="col s4 categories-types">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Типы бань</h4></li>
                        <li className="collection-item">На дровах (100)</li>
                        <li className="collection-item">Финская (80)</li>
                        <li className="collection-item">Хамам (60)</li>
                        <li className="collection-item">Турецкая (50)</li>
                    </ul>
                </div>
                <div className="col s4">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Назначение</h4></li>
                        <li className="collection-item">На двоих (100)</li>
                        <li className="collection-item">Корпоратив (80)</li>
                        <li className="collection-item">Семейная (60)</li>
                        <li className="collection-item">Детская (50)</li>
                    </ul>
                </div>
                <div className="col s4">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Услуги</h4></li>
                        <li className="collection-item">Банщик (100)</li>
                        <li className="collection-item">Массаж (80)</li>
                        <li className="collection-item">Тапочки (60)</li>
                        <li className="collection-item">Кухни (50)</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <p className="left-align">
                    Бани и сауны всегда были достаточно востребованы у тех, кто прежде всего заботится о своём здоровье,
                    а также любит приятно проводить своё время в кругу друзей. В современном мире существует огромная
                    разновидность бань и саун, которые могут удовлетворить капризы самых придирчивых гостей. К тому же,
                    стоит отметить благоприятное влияние парилок на физическое и ментальное здоровье человека.
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    // console.log('bathrooms', state)
    return {
        data: state.bathrooms.data,
        meta: state.bathrooms.meta
    }
};

export default {
    component: Home,
    // saga: allSagas.bathroomsSaga,
    // sagaUrl: routes.sagaUrl,
    // sagaMetaUrl: routes.sagaMetaUrl
}