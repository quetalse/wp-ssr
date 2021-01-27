import React, { forwardRef, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";

import { getPageData } from "../../../selectors";

export const PageDataFooter = () => {
    const {data, error, loading} = useSelector(getPageData);

    return (
        <div className="row">
            <p className="left-align">{data ? data.text : <Skeleton count={4}/>}</p>
        </div>
    )
}