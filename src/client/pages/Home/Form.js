import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AppSelect from "../../components/ui/AppSelect";
import { sagaFetchHome } from "../../../store/actions/home";


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

const Form = ({routes}) => {
    const dispatch = useDispatch();

    const types = useSelector(state => {
        if(!state.home.data.types){
            return null
        }
        return state.home.data.types
    });

    const metro = useSelector(state => {
        if(!state.home.data.metro){
            return null
        }
        return state.home.data.metro
    });

    const [selected, setSelected] = useState({
        type: null,
        metro: null
    });

    useEffect(() => {
            const url = routes.filter((route)=>{
                return route.name === 'types' || route.name === 'metro'
            });
            dispatch(sagaFetchHome(url))
        },[]
    );

    const handleSelect = (selectedOption, select) => {
        setSelected( {
            ...selected,
            [select]: selectedOption
        });
    };

    return (
        <form className="row inputs">
            <div className="col s8 input-field">
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
            <div className="col s4 input-field">
                <button
                    className="btn waves-effect waves-light input-tool"
                    disabled={!(metro&&types)}
                >
                    Поиск <span>(5)</span>
                </button>
            </div>
        </form>
    )
}

export default Form;