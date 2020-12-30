import React, { forwardRef, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";

const Foot = () => {

    console.log('Foot')

    const page = useSelector( state => {
        if(!state.home.data.page){return null}
        return state.home.data.page
    });

    return (
        <div className="row">
            <p className="left-align">{page.text || <Skeleton count={4}/>}</p>
        </div>
    )
}

export default Foot;