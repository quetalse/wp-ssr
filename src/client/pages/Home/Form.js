import React, { useEffect, useState } from 'react';
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

const Form = () => {

    const [selected, setSelected] = useState({
        type: null,
        metro: null
    });

    useEffect(() => {
            if(!collections){
                const url = routes.filter((route)=>{
                    return route.name === 'topCategories'
                });
                dispatch(sagaFetchHome(url))
            }
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
                        selectedOption={selected.type}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'type')}
                        placeholder="Выбор типа"
                        options={typesOptions}
                    />
                </div>
                <div className="input-tool">
                    <label>Метро</label>
                    <AppSelect
                        selectedOption={selected.metro}
                        handleChange={(selectedOption) => handleSelect(selectedOption, 'metro')}
                        placeholder="Выбор метро"
                        options={typesOptions}
                    />
                </div>
            </div>
            <div className="col s4 input-field">
                <button
                    className="btn waves-effect waves-light input-tool"
                    disabled={true}
                >
                    Поиск <span>(5)</span>
                </button>
            </div>
        </form>
    )
}

export default Form;