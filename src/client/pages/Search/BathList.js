import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import BathCard from "../../components/bathCards/BathCard";
import Skeleton from "../../components/skeletons/BathroomCard";
import {sagaFetchClassifiers} from "../../../store/actions/home";

const BathList = ({route, count}) => {

    const [bathList, setBathList] = useState(null);

    useEffect(async () => {
        const response = await fetch(route);
        const data = await response.json();

        setBathList(data)
    },[])


    const renderBathList = () => {
        let list;
        if (bathList){
            list = bathList.map((bath) => (
                <BathCard/>
            ))
        }else{
            list = new Array(count).map((bath) => {
                console.log(bath)
                return <Skeleton/>
            })
        }
        return list;
    }
    console.log(renderBathList())

    return (
        <div className="">
            {/*{renderBathList()}*/}
        </div>
    )
}

export default BathList;