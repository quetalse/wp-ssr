import React, { Fragment, useEffect} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {sagaFetchClassifier} from "../../../../store/actions/classifier";

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

export const AppSelect = ({classifierTitle, label, instanceId, selectedOption, handleChange, placeholder }) => {

     const dispatch = useDispatch();
     const classifier = useSelector( state => {
         if(!state.classifiers[classifierTitle]) return {}
         return state.classifiers[classifierTitle]
     });

    useEffect(() => {
        if(!classifier.data){
            dispatch(sagaFetchClassifier(classifierTitle))
        }
    },[])

    // const getOptions = (array) => array.map(([value, label, icon]) => ({value, label, icon}));
    const getOptions = (array) => {
        let temp = [];
        for (let value in array) {
            temp.push({
                value,
                label:array[value].title
            })
        }
        return temp;
    }

    const value = selectedOption.label === null ? null : selectedOption;
    const options = classifier.data ? getOptions(classifier.data) : {};



    if(classifier.error) return null;
    return (
        <Fragment>
            <label>{label}</label>
            <Select
                instanceId={instanceId}
                isDisabled={!classifier.data}
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