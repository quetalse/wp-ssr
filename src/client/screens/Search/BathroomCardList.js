import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { BathroomCard } from "../../components/BathroomCard";
import Skeleton from "../../components/skeletons/BathroomCard";
import { _arraySkeleton } from "../../components/skeletons/_arraySkeleton";
import {sagaFetchClassifiers} from "../../../store/actions/home";
import {useDispatch, useSelector} from "react-redux";
import {sagaFetchClassifier} from "../../../store/actions/classifier";

export const BathroomCardList = ({count, classifierTitles}) => {

    const dispatch = useDispatch();
    const {pathname, search} = useLocation();
    const [bathList, setBathList] = useState(null);
    const route = `${process.env.__API_BASE__}/api/${pathname}${search}`;

    const classifiers = useSelector(state => {
        let data = {};
        classifierTitles.map((classifierTitle) => {
            if(state.classifiers[classifierTitle]) {
                data[classifierTitle] = state.classifiers[classifierTitle].data
            }
        })
        return data;
    });

    useEffect(async () => {
            classifierTitles.map((classifierTitle) => {
                if(!classifiers[classifierTitle]) {
                    dispatch(sagaFetchClassifier(classifierTitle))
                }
            })
        },[]
    );

    useEffect(async () => {
        const response = await fetch(route);
        const data = await response.json();
        setBathList(data)
    },[])

    const loadedClassifiers = classifierTitles.filter(classifierTitle => classifiers[classifierTitle]);
    const isReadyClassifiers = loadedClassifiers.length === classifierTitles.length;

    const renderBathList = () => {
        if (bathList && isReadyClassifiers){
            return bathList.map((bath, index) => (
                <BathroomCard key={`${index}`} bath={bath} classifierTitles={["aqua", "entertainment", "equipment", "location", "type", "purpose", "services", "metro"]}/>
            ))
        }else{
            return _arraySkeleton(count, Skeleton)
        }
    }

    return (
        <div className="">
            {renderBathList()}
        </div>
    )
}