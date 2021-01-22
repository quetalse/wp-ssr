import React, { Fragment, useEffect} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {sagaFetchClassifiers} from "../../../../store/actions/classifiers";

const customStyles = {
    menu: (provided, state) => ({
        ...provided, padding: 4
    }),
    control: (_, {selectProps: {height}}) => ({
        ..._,
        height: height
    }),
    valueContainer: (_, {selectProps: {height}}) => ({
        ..._,
        height: height,
        lineHeight: height
    }),
    input: (_, state) => ({
        ..._,
        height: "3rem",
        position: "absolute",
        paddingTop: 0
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    }
}

export const AppSelect = ({classifier, label, instanceId, selectedOption, handleChange, placeholder }) => {

     const dispatch = useDispatch();
     const {data, error, loading} = useSelector( state => {
         return state.classifiers
     });

    useEffect(() => {
            // const url = clientSagaData.filter((route)=>{
            //     return route.name === 'classifiers'
            // });
            dispatch(sagaFetchClassifiers(classifier))
    },[])

    const getOptions = (array) => array.map(([value, label, icon]) => ({value, label, icon}));

    const value = selectedOption.label === null ? null : selectedOption;
    const options = data ? getOptions(data[classifier]) : {};

    if(error) return null;
    return (
        <Fragment>
            <label>{label}</label>
            <Select
                instanceId={instanceId}
                isDisabled={!data}
                styles={customStyles}
                height="3rem"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                options={options}
            />
        </Fragment>
    )
}