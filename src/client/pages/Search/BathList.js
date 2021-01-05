import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import BathCard from "../../components/bathCards/BathCard";
import Skeleton from "../../components/skeletons/BathroomCard";

const BathList = () => {

    return (
        <div className="">
            <Skeleton/>
            <BathCard/>
            <BathCard/>
            <BathCard/>
        </div>
    )
}

export default BathList;