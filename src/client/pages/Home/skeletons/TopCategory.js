import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TopCategory = () => {
    return (
        <SkeletonTheme color="#a4b4bc" highlightColor="#94a7b0">
            <div className="col s4">
                <ul className="collection with-header">
                    <li className="collection-header" key={0}>
                        <h4><Skeleton height={40}/></h4>
                    </li>
                    <li className="collection-item"><Skeleton count={8} /></li>
                    <span><Skeleton width={120} /></span>
                </ul>
            </div>
        </SkeletonTheme>
    )
}

export default TopCategory;