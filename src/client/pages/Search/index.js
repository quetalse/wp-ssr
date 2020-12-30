import React, { useEffect, useState } from 'react';
import Skeleton from "./skeletons/BathroomCard";

import Select from 'react-select';
import {Link} from 'react-router-dom';

import "./index.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { allSagas } from "../../../store/sagas";
import { sagaFetchHome} from "../../../store/actions/home";
import DatePicker from "react-datepicker";
import AppSelect from "../../components/ui/AppSelect";
// import { sagaFetchBathRooms } from "../../store/actions/bathrooms";
// import { allSagas } from "../../store/sagas";

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

const serverSagaData = [
    // { name: 'static', url: 'https://my.api.mockaroo.com/home.json?key=06826450'},
    // {name: 'types', url: 'https://my.api.mockaroo.com/typesSelect.json?key=06826450'},
    // {name: 'metro', url: 'https://my.api.mockaroo.com/metroSelect.json?key=06826450'},
    // {name: 'randomBathrooms', url: 'https://my.api.mockaroo.com/randomBathrooms.json?key=06826450'},
    // {name: 'topCategories', url:'https://my.api.mockaroo.com/topCategories.json?key=06826450'}
]

const routes = {
    // sagaUrl: 'https://jsonplaceholder.typicode.com/photos?_limit=20',
    // sagaMetaUrl: 'https://jsonplaceholder.typicode.com/users/1'
    sagaUrl: '/api/page/home',
    serverSagaData,
    clientSagaData: [
        // {name: 'count', url: 'https://my.api.mockaroo.com/count.json?key=06826450'},
        ...serverSagaData
    ],
    keysSsrIgnore: ['static', 'count', 'topCategories']
};


const Search = ({history}) => {

    const params = new URLSearchParams(history.location.search);
    const type = params.get('type');
    const metro = params.get('metro');
    console.log('type', type)
    console.log('metro', metro)

    const dispatch = useDispatch();

    const home = useSelector(state => {
        if(!state.home.data.static){return null}
        return state.home.data.static
    });

    const [startDate, setStartDate] = useState(new Date());
    const [selected, setSelected] = useState({
        metro: {
            label: null,
            value: null
        },
        location: {
            label: null,
            value: null
        }
    });
    const [additional, setAdditional] = useState(false);

    useEffect(() => {
        // if(!home){
        //     const url = routes.serverSagaData.filter((route)=>{
        //         return route.name === 'static'
        //     });
        //     dispatch(sagaFetchHome(url))
        // }
    },[])

    const handleSelect = async (selectedOption, selectKey) => {
        if (selected[selectKey].label !== selectedOption.label) {
            console.log(`Option selected:`, selectedOption);
            setSelected({
                ...selected,
                [selectKey]: selectedOption
            });
        }
    }
    const showAdditional = () => {
        setAdditional(!additional)
    }

            // let h1 = home ? home.h1 : <Skeleton count={1} width={160}/>;
    // let slogan = home ? home.slogan : <Skeleton count={2}/>;
    // let text = home ? home.text : <Skeleton count={4}/>;

    let showAdditionalText = additional ? 'Скрыть услуги' : 'Смотреть все услуги';

    return (<div className="" style={{marginTop: '50px'}}>
            <div className="row">
                <h1>Поиск</h1>
                <p>Найдено резульататов: </p>
            </div>
            <div className="row">
                <div className="col s3" style={{backgroundColor: '#90a4ae'}}>
                    <div className="input-field">
                        <DatePicker
                            style={{'margin': '0 auto'}}
                            dateFormat="dd/MM/yyyy"
                            locale="ru"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            closeOnScroll={true}
                            popperPlacement="bottom"
                            minDate={new Date()}
                            inline
                        />
                    </div>
                    <div className="input-tool">
                        <label>Метро</label>
                        <AppSelect
                            instanceId="metro-select"
                            // isDisabled={!types}
                            selectedOption={selected.metro}
                            handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                            placeholder="Выбор метро"
                            options={typesOptions}
                        />
                    </div>
                    <div className="input-tool">
                        <label>Местоположение</label>
                        <AppSelect
                            instanceId="location-select"
                            // isDisabled={!metro}
                            selectedOption={selected.location}
                            handleChange={(selectedOption) => handleSelect(selectedOption, 'location')}
                            placeholder="Выбор местоположения"
                            options={typesOptions}
                        />
                    </div>
                    <div className="" style={{width: '100%'}}>
                        <ul className="collection with-header">
                            <li className="collection-header" key={0}>
                                <h4>Типы</h4>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" className="filled-in"/>
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" />
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" />
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" className="filled-in"/>
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <Link to="google.com">Посмотреть все</Link>
                        </ul>
                    </div>
                    <div className="" style={{width: '100%'}}>
                        <ul className="collection with-header">
                            <li className="collection-header" key={0}>
                                <h4>Типы</h4>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" className="filled-in"/>
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" />
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" />
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <li className="collection-item">
                                <label>
                                    <input type="checkbox" className="filled-in"/>
                                    <span>На дровах</span>
                                </label>
                            </li>
                            <Link to="google.com">Посмотреть все</Link>
                        </ul>
                    </div>
                    <div className="input-field">
                        <button
                            style={{width: '100%'}}
                            className="btn waves-effect waves-light input-tool"
                            // onClick={searchHandler}
                            disabled={!(selected.type || selected.metro)}
                        >Поиск
                            {/*{!count.load || <img width="20px" style={{'top': '4px'}} src="/images/loading.gif" alt="Загрузка"/>}*/}
                            {/*{count.data ? `(${count.data})` : ''}*/}
                        </button>
                    </div>
                </div>
                <div className="col s9">
                    <Skeleton/>
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
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    // console.log('home', state)
    return {
        data: state.home.data,
        // meta: state.bathrooms.meta
    }
};

export default {
    component: Search,
    saga: allSagas.homeSaga,
    dataUrls: routes.dataUrls,
    serverSagaData: routes.serverSagaData,
    keysSsrIgnore: routes.keysSsrIgnore,
    stateKey: 'home'
    // sagaMetaUrl: routes.sagaMetaUrl
}