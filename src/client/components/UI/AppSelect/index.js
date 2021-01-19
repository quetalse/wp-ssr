import React, { Fragment } from 'react';
import Select from 'react-select';
import {useSelector} from "react-redux";

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

     const {data, error, loading} = useSelector(state => {
         return state.classifiers
     });

     const getOptions = (array) => {
         return array.map((item) => ({
                 value: item[0],
                 label: item[1],
                 icon:  item[2]
             })
         )
     };
    const value = selectedOption.label === null ? null : selectedOption;
    const options = data ? getOptions(data[classifier]) : {};
    const content = () => {
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
            </Fragment>)
    }

    return (
        <Fragment>
            { error ? false : content() }
        </Fragment>
    )
}