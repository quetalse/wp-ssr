import React, { forwardRef, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";

const Head = () => {

    console.log('Head')

    const page = useSelector( state => {
        if(!state.home.data.page){return null}
        return state.home.data.page
    });

    const count =  useSelector( state => {
        if(!state.home.data.count){return null}
        return state.home.data.count.count
    });

    return (
        <div className="row">
            <h1>{page.h1 || <Skeleton count={1} width={160}/>}</h1>
            <p>{page.slogan || <Skeleton count={2}/>}
                &ensp;<span>{count}</span>
            </p>
        </div>
    )
}

export default Head;