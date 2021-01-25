import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { AppSelect } from "../UI/AppSelect";
import { AppDatePicker } from "../UI/AppDatePicker";
import { AppCollectionForm } from "../UI/AppCollectionForm";
import { AppBtnSearch } from "../UI/AppBtnSearch";

import { sagaFetchHome } from "../../../store/actions/home";

import moment from 'moment';

import {Link} from "react-router-dom";

export const FilterPanelLeft = () => {

    const [datePicker, setDatePicker] = useState(new Date());
    const [btnCounter, setBtnCounter] = useState({
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

    const handleSelect = async (selectedOption, selectKey) => {
        if (selected[selectKey].label !== selectedOption.label) {
            console.log(`Option selected:`, selectedOption);
            setSelected({
                ...selected,
                [selectKey]: selectedOption
            });

            setBtnCounter({
                value: false,
                loader: true
            });

            const location = selectKey === 'location' ? selectedOption.value : selected['location'].value;
            const metro = selectKey === 'metro' ? selectedOption.value : selected['metro'].value;

            // const response = await fetch('https://my.api.mockaroo.com/count.json?key=06826450');
            const response = await fetch(`${process.env.__API_BASE__}/api/presearch?location=[${location}]&metro=[${metro}]&purpose=[1]&only_count`);
            const data = await response.json();
            setBtnCounter({
                value: data.count,
                loader: false
            });
        }
    }

    return (
        <aside className="filterPanelLeft">
            <form className="filterPanelForm">
                <div className="input-field">
                    <AppDatePicker
                        label="Дата"
                        mode="inline"
                        startDate={datePicker}
                        setStartDate={setDatePicker}
                    />
                </div>
                <div className="input-tool">
                    <AppSelect
                        classifierTitle="metro"
                        label="Метро"
                        instanceId="metro-select"
                        selectedOption={selected.metro}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                        placeholder="Выбор метро"
                    />
                </div>
                <div className="input-tool">
                    <AppSelect
                        classifierTitle="location"
                        label="Местоположение"
                        instanceId="location-select"
                        selectedOption={selected.location}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'location')}
                        placeholder="Выбор местоположения"
                    />
                </div>
                <div className="">
                    <AppCollectionForm classifierTitle="purpose"/>
                </div>
                <div className="">
                    <AppCollectionForm classifierTitle="services"/>
                </div>
                <div className="">
                    <AppCollectionForm classifierTitle="aqua"/>
                </div>
                <div className="input-field">
                    <AppBtnSearch
                        classifierTitles={["location", "metro"]}
                        text="Поиск"
                        btnCounter={btnCounter}
                        selected={selected}
                        datePicker={datePicker}
                    />
                </div>
            </form>
        </aside>
    )
}