import React from 'react';
import Select from 'react-select';

import {Link} from 'react-router-dom';

const customStyles = {
    menu: (provided, state) => {
        console.log('provided', provided)
        return {
            ...provided,
            // width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            // color: state.selectProps.menuColor,
            padding: 20
        }
    },

    control: (_, {selectProps: {height}}) => {

        return {
            ..._,
            height: height
        }
    },

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

export default ({ selectedOption, handleChange, options }) => {
    return (
        <Select
            styles={customStyles}
            height="3rem"
            placeholder="Выбор типа..."
            value={selectedOption}
            onChange={handleChange}
            options={options}
        />
    )
}