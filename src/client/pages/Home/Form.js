import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

import AppSelect from "../../components/ui/AppSelect";
import AppBtnSearch from "../../components/ui/AppBtnSearch";
import AppDatePicker from "../../components/ui/AppDatePicker";

import { dropField, sagaFetchHome } from "../../../store/actions/home";

const Form = ({routes, history}) => {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [count, setCount] = useState({
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

    const {data, error, loading} = useSelector(state => {
        // if(!state.data.classifiers) return {}
        return state.classifiers
    })

    console.log('data', data)

    const handleSelect = async (selectedOption, selectKey) => {

        if(selected[selectKey].label !== selectedOption.label){
            setSelected( {
                ...selected,
                [selectKey]: selectedOption
            });

            setCount({
                value: false,
                loader: true
            });

            const type = selectKey === 'type' ? selectedOption.value : selected['type'].value;
            const metro = selectKey === 'metro' ? selectedOption.value : selected['metro'].value;
            const response = await fetch(`${process.env.__API_BASE__}/api/presearch?type=[${type}]&metro=[${metro}]&purpose=[1]&only_count`);
            const data = await response.json();
            setCount({
                value: data.count,
                loader: false
            });
        }
    };
    const searchHandler = (e) => {
        e.preventDefault();
        let date = moment(startDate).format("DD/MM/YYYY"),
            type = selected.type.value || null,
            metro = selected.metro.value || null;
        // dispatch(dropField(['page', 'count']));
        history.push(`/search?type=${type}&metro=${metro}&date=[${date}]`);
    }

    return (
        <form className="row inputs">
            <div className="col s6 input-field">
                <div className="input-tool">
                    <AppSelect
                        label="Тип"
                        instanceId="types-select"
                        isDisabled={!data}
                        selectedOption={selected.type}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'type')}
                        placeholder="Выбор типа"
                        preOptions={data ? data.types : null} // нераспрарсеные options
                    />
                </div>
                <div className="input-tool">
                    <AppSelect
                        label="Метро"
                        instanceId="metro-select"
                        isDisabled={!data}
                        selectedOption={selected.metro}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                        placeholder="Выбор метро"
                        preOptions={data ? data.metro : null} // нераспрарсеные options
                    />
                </div>
            </div>
            <div className="col s3 input-field">
                <AppDatePicker
                    label="Дата"
                    mode="popup"
                    startDate={startDate}
                    setStartDate={setStartDate}
                />
            </div>
            <div className="col s3 input-field">
                <AppBtnSearch
                    text="Поиск"
                    disabled={!data}
                    onClick={searchHandler}
                    countLoader={count.loader}
                    countValue={count.value}
                />
            </div>
        </form>
    )
}

export default Form;