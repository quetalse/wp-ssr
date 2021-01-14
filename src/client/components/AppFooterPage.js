import React, { forwardRef, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";

export const AppFooterPage = ({forPage}) => {
    const {data, error, loading} = useSelector(state => (state.page));

    return (
        <div className="row">
            {/*<p className="left-align">{data ? data.page.text : <Skeleton count={4}/>}</p>*/}
        </div>
    )
}