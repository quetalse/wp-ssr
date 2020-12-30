import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AppSelect from "../../components/ui/AppSelect";
import { sagaFetchHome } from "../../../store/actions/home";
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from "date-fns/locale/ru";
import moment from 'moment';

import './react-datepicker.scss';
registerLocale('ru', ru);
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
    const ref = React.createRef();

    const [startDate, setStartDate] = useState(new Date());
    const [count, setCount] = useState({
        data: false,
        load: false
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

    const types = useSelector(state => {
        if(!state.home.data.types){
            // return null
            return typesOptions
        }
        // return state.home.data.types
        return typesOptions
    });
    const metro = useSelector(state => {
        if(!state.home.data.metro){
            // return null
            return metroOptions
        }
        // return state.home.data.metro
        return metroOptions
    });
    // const count = useSelector(state => {
    //     if(!state.home.data.count){
    //         return null
    //     }
    //     return state.home.data.count.count
    // });

    useEffect(() => {
            const url = routes.filter((route)=>{
                return route.name === 'types' || route.name === 'metro'
            });
            dispatch(sagaFetchHome(url))
        },[]);

    const handleSelect = async (selectedOption, selectKey) => {

        if(selected[selectKey].label !== selectedOption.label){
            setSelected( {
                ...selected,
                [selectKey]: selectedOption
            });
            setCount({
                data: false,
                load: true
            });
            const type = selectKey === 'type' ? selectedOption.label : selected['type'].label;
            const metro = selectKey === 'metro' ? selectedOption.label : selected['metro'].label;

            // const response = await fetch('https://my.api.mockaroo.com/count.json?key=06826450');
            const response = await fetch(`api/presearch?type=${type}&metro=${metro}&only_count`);
            let data = await response.json();
            setCount({
                data: data.count,
                load: false
            });
        }
    };
    const searchHandler = (e) => {
        e.preventDefault();
        let date = moment(startDate).format("DD/MM/YYYY"),
            type = selected.type.value || null,
            metro = selected.type.metro || null;
        history.push(`/search?type=${type}&metro=${metro}&date=[${date}]`);
    }
    const CustomDateInput = forwardRef(({ onClick, value }, ref) => (
        <div>
            <label htmlFor="datePicker">Дата</label>
            <input id="datePicker"
                   className="datepicker"
                   onClick={(e) => {  e.preventDefault(); onClick() }}
                   ref={ref}
                   defaultValue={value}/>
        </div>
    ));

    return (
        <form className="row inputs">
            <div className="col s6 input-field">
                <div className="input-tool">
                    <label>Тип</label>
                    <AppSelect
                        instanceId="types-select"
                        isDisabled={!types}
                        selectedOption={selected.type}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'type')}
                        placeholder="Выбор типа"
                        options={types || {}}
                    />
                </div>
                <div className="input-tool">
                    <label>Метро</label>
                    <AppSelect
                        instanceId="metro-select"
                        isDisabled={!metro}
                        selectedOption={selected.metro}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                        placeholder="Выбор метро"
                        options={metro || {}}
                    />
                </div>
            </div>
            <div className="col s3 input-field">
                <DatePicker
                    style={{'margin': '0 auto'}}
                    dateFormat="dd/MM/yyyy"
                    locale="ru"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    closeOnScroll={true}
                    popperPlacement="bottom"
                    minDate={new Date()}
                    customInput={<CustomDateInput ref={ref}/>}
                />
            </div>
            <div className="col s3 input-field">
                <button
                    className="btn waves-effect waves-light input-tool"
                    onClick={searchHandler}
                    disabled={!(selected.type || selected.metro)}
                >Поиск
                    {!count.load || <img width="20px" style={{'top': '4px'}} src="/images/loading.gif" alt="Загрузка"/>}
                    {count.data ? `(${count.data})` : ''}
                </button>
            </div>
        </form>
    )
}

export default Form;