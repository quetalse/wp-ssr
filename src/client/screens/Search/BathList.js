import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import BathCard from "../../components/bathCards/BathCard";
import Skeleton from "../../components/skeletons/BathroomCard";
import _arraySkeleton from "../../components/skeletons/_arraySkeleton";
import {sagaFetchClassifiers} from "../../../store/actions/home";

export const BathList = ({route, count}) => {

    const [bathList, setBathList] = useState(null);

    useEffect(async () => {
        const response = await fetch(route);
        const data = await response.json();
        setBathList(data)
    },[])


    const renderBathList = () => {
        if (bathList){
            return bathList.map((bath, index) => (
                <BathCard key={index} bath={bath}/>
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