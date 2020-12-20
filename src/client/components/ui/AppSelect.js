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

 const AppSelect = ({ selectedOption, handleChange, placeholder, options }) => {
    return (
        <Select
            isDisabled={true}
            styles={customStyles}
            height="3rem"
            placeholder={placeholder}
            value={selectedOption}
            onChange={handleChange}
            options={options}
        />
    )
}

export default AppSelect;