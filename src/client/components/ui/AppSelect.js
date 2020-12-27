import React from 'react';
import Select from 'react-select';

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

 const AppSelect = ({instanceId, isDisabled, selectedOption, handleChange, placeholder, options }) => {

    let value = selectedOption.label === null ? null : selectedOption

    return (
        <Select
            instanceId={instanceId}
            isDisabled={isDisabled}
            styles={customStyles}
            height="3rem"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            options={options}
        />
    )
}

export default AppSelect;