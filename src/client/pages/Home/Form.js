import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

import AppSelect from "../../components/ui/AppSelect";
import AppBtnSearch from "../../components/ui/AppBtnSearch";
import AppDatePicker from "../../components/ui/AppDatePicker";

import { dropField, sagaFetchHome } from "../../../store/actions/home";

const Form = ({routes, history}) => {

    const dispatch = useDispatch();
    const [datePicker, setDatePicker] = useState(new Date());
    const [btnCounter, setBtnCounter] = useState({
        value: false,
        loader: false
    });

    const [selected, setSelected] = useState({
        type: {
            label: null,
            value: null
        },
        metro: {
            label: null,
            value: null
        }
    });


    // console.log('data', data)

    const handleSelect = async (selectedOption, selectKey) => {

        if(selected[selectKey].label !== selectedOption.label){
            setSelected( {
                ...selected,
                [selectKey]: selectedOption
            });

            setBtnCounter({
                value: false,
                loader: true
            });

            const type = selectKey === 'type' ? selectedOption.value : selected['type'].value;
            const metro = selectKey === 'metro' ? selectedOption.value : selected['metro'].value;
            const response = await fetch(`${process.env.__API_BASE__}/api/presearch?type=[${type}]&metro=[${metro}]&purpose=[1]&only_count`);
            const data = await response.json();
            setBtnCounter({
                value: data.count,
                loader: false
            });
        }
    };

    return (
        <form className="row inputs">
            <div className="col s6 input-field">
                <div className="input-tool">
                    <AppSelect
                        classifier="types"
                        label="Тип"
                        instanceId="types-select"
                        selectedOption={selected.type}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'type')}
                        placeholder="Выбор типа"
                    />
                </div>
                <div className="input-tool">
                    <AppSelect
                        classifier="metro"
                        label="Метро"
                        instanceId="metro-select"
                        selectedOption={selected.metro}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                        placeholder="Выбор метро"
                    />
                </div>
            </div>
            <div className="col s3 input-field">
                <AppDatePicker
                    label="Дата"
                    mode="popup"
                    startDate={datePicker}
                    setStartDate={setDatePicker}
                />
            </div>
            <div className="col s3 input-field">
                <AppBtnSearch
                    text="Поиск"
                    btnCounter={btnCounter}
                    selected={selected}
                    datePicker={datePicker}
                />
            </div>
        </form>
    )
}

export default Form;