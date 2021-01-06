import React, { forwardRef, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";

const FooterMain = ({forPage}) => {

    const {page} = useSelector(state => {
        if(!state.data.page) return{}
        return state.data.page
    });

    return (
        <div className="row">
            <p className="left-align">{page ? page.text : <Skeleton count={4}/>}</p>
        </div>
    )
}

export default FooterMain;