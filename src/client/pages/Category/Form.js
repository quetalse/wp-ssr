import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import AppSelect from "../../components/ui/AppSelect";
import AppDatePicker from "../../components/ui/AppDatePicker";
import AppCollection from "../../components/ui/AppCollection";
import AppBtnSearch from "../../components/ui/AppBtnSearch";

import { sagaFetchHome } from "../../../store/actions/home";

import moment from 'moment';

import {Link} from "react-router-dom";

const Form = ({routes, history}) => {

    const dispatch = useDispatch();
    const [count, setCount] = useState({
        value: false,
        loader: false
    });
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
    const {types, metro, purpose, services, aqua, entertainment} = useSelector(state => {
        if(!state.data.classifiers) return {}
        return state.data.classifiers
    })

    // useEffect(() => {
    //     if(!types) {
    //         let url = routes.filter((route) => {
    //             return route.name === 'types' || route.name === 'metro'
    //         });
    //         dispatch(sagaFetchHome(url))
    //     }
    // },[]);

    const handleSelect = async (selectedOption, selectKey) => {
        if (selected[selectKey].label !== selectedOption.label) {
            console.log(`Option selected:`, selectedOption);
            setSelected({
                ...selected,
                [selectKey]: selectedOption
            });

            setCount({
                value: false,
                loader: true
            });

            const location = selectKey === 'location' ? selectedOption.value : selected['location'].value;
            const metro = selectKey === 'metro' ? selectedOption.value : selected['metro'].value;

            // const response = await fetch('https://my.api.mockaroo.com/count.json?key=06826450');
            const response = await fetch(`${process.env.__API_BASE__}/api/presearch?location=[${location}]&metro=[${metro}]&purpose=[1]&only_count`);
            const data = await response.json();
            setCount({
                value: data.count,
                loader: false
            });
        }
    }

    return (
        <form className="">
            <div className="input-field">
                <AppDatePicker
                    label="Дата"
                    mode="inline"
                />
            </div>
            <div className="input-tool">
                <AppSelect
                    label="Метро"
                    instanceId="metro-select"
                    isDisabled={!metro}
                    selectedOption={selected.metro}
                    handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                    placeholder="Выбор метро"
                    preOptions={metro}
                />
            </div>
            <div className="input-tool">
                <AppSelect
                    label="Местоположение"
                    instanceId="location-select"
                    isDisabled={!types}
                    selectedOption={selected.location}
                    handleChange={(selectedOption) => handleSelect(selectedOption, 'location')}
                    placeholder="Выбор местоположения"
                    preOptions={types}
                />
            </div>
            <div className="">
                <AppCollection category={purpose} topCategories={false}/>
            </div>
            <div className="">
                <AppCollection category={services} topCategories={false}/>
            </div>
            <div className="">
                <AppCollection category={aqua} topCategories={false}/>
            </div>
            <div className="input-field">
                <AppBtnSearch
                    text="Поиск"
                    disabled={!(metro || metro)}
                    onClick={() => {console.log('click')}}
                    countLoader={count.loader}
                    countValue={count.value}
                />
            </div>
        </form>
    )
}

export default Form;