import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import AppSelect from "../../components/ui/AppSelect";
import AppDatePicker from "../../components/ui/AppDatePicker";
import AppCollection from "../../components/ui/AppCollection";
import AppBtnSearch from "../../components/ui/AppBtnSearch";

import { sagaFetchHome } from "../../../store/actions/home";

import moment from 'moment';

import {Link} from "react-router-dom";


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

const Form = ({routes, history}) => {

    const dispatch = useDispatch();
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
    const types = useSelector(state => state.home.data.types)

    // console.log('types', types)

    useEffect(() => {
        if(!types) {
            let url = routes.filter((route) => {
                return route.name === 'types' || route.name === 'metro'
            });
            dispatch(sagaFetchHome(url))
        }
    },[]);

    const handleSelect = async (selectedOption, selectKey) => {
        if (selected[selectKey].label !== selectedOption.label) {
            console.log(`Option selected:`, selectedOption);
            setSelected({
                ...selected,
                [selectKey]: selectedOption
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
                    // isDisabled={!types}
                    selectedOption={selected.metro}
                    handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                    placeholder="Выбор метро"
                    options={typesOptions}
                />
            </div>
            <div className="input-tool">
                <AppSelect
                    label="Местоположение"
                    instanceId="location-select"
                    // isDisabled={!metro}
                    selectedOption={selected.location}
                    handleChange={(selectedOption) => handleSelect(selectedOption, 'location')}
                    placeholder="Выбор местоположения"
                    options={typesOptions}
                />
            </div>
            <div className="" style={{width: '100%'}}>
                {/*<AppCollection category topCategories={false}/>*/}
            </div>
            <div className="" style={{width: '100%'}}>
                {/*<AppCollection topCategories={false}/>*/}
            </div>
            <div className="input-field">
                <AppBtnSearch
                    text="Поиск"
                    disabled={!(selected.type || selected.metro)}
                    onClick={() => {console.log('click')}}
                    countLoader={false}
                    countValue={5}
                />
            </div>
        </form>
    )
}

export default Form;