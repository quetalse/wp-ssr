import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {Link} from "react-router-dom";

const BathroomCard = () => {
    return (
        <SkeletonTheme color="#a4b4bc" highlightColor="#94a7b0">
            <div className="row card bathroom-card">
                <div className="row bathroom-card-main">
                    <div className="col s3 bathroom-card-head card-image">
                        <Skeleton height={130}/>
                    </div>
                    <div className="col s9 bathroom-card-content left-align">
                        <span className="content-price"><Skeleton height={25} width={111}/></span>
                        <p className="content-title"><Skeleton height={25} width={278}/></p>
                        <ul className="content-stations">
                            <li className="valign-wrapper station">
                                <Skeleton height={13} width={278} />
                            </li>
                            <li className="valign-wrapper station">
                                <Skeleton height={13} width={278} />
                            </li>
                            <li className="valign-wrapper station">
                                <Skeleton height={13} width={278} />
                            </li>
                        </ul>
                        <ul className="content-icons">
                            <li data-tip="React-tooltip" className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                            <li className="content-icon">
                                <Skeleton height={25} width={26}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default BathroomCard;