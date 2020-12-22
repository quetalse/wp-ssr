import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RandomBath = () => {

    const [selected, setSelected] = useState({
        type: null,
        metro: null
    });

    const handleSelect = (selectedOption, select) => {
        setSelected( {
            ...selected,
            [select]: selectedOption
        });
    };

    return (
        <div className="row">
            <div className="random-card-offers">
                <div className="card">
                    <div className="card-image">
                        <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                        {/*<img src="http://sk-pestovo.ru/assets/images/brus-types-1.png"/>*/}
                        <span className="card-head card-price">300 р</span>
                        <span className="card-head card-mark">5</span>
                    </div>
                    <div className="card-content left-align">
                        <p className="content-title">Название</p>
                        <p className="content-type">Тип 4</p>
                        <ul className="content-stations">
                            <li className="valign-wrapper station">
                                Метро 1 <img className="secondary-content" width="10px"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                            </li>
                            <li className="valign-wrapper station">
                                Метро 2 <img className="secondary-content" width="10px"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <SkeletonTheme color="#78909c" highlightColor="#94a7b0">
                        <div className="card-image">
                            <Skeleton height={134}/>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title"><Skeleton /></p>
                            <p className="content-type"><Skeleton /></p>
                            <ul className="content-stations">
                                <Skeleton />
                                <Skeleton />
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 1 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 2 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </SkeletonTheme>
                </div>
                <div className="card">
                    <SkeletonTheme color="#78909c" highlightColor="#94a7b0">
                        <div className="card-image">
                            <Skeleton height={134}/>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title"><Skeleton /></p>
                            <p className="content-type"><Skeleton /></p>
                            <ul className="content-stations">
                                <Skeleton />
                                <Skeleton />
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 1 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 2 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </SkeletonTheme>
                </div>
                <div className="card">
                    <SkeletonTheme color="#78909c" highlightColor="#94a7b0">
                        <div className="card-image">
                            <Skeleton height={134}/>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title"><Skeleton /></p>
                            <p className="content-type"><Skeleton /></p>
                            <ul className="content-stations">
                                <Skeleton />
                                <Skeleton />
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 1 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 2 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </SkeletonTheme>
                </div>
                <div className="card">
                    <SkeletonTheme color="#78909c" highlightColor="#94a7b0">
                        <div className="card-image">
                            <Skeleton height={134}/>
                        </div>
                        <div className="card-content left-align">
                            <p className="content-title"><Skeleton /></p>
                            <p className="content-type"><Skeleton /></p>
                            <ul className="content-stations">
                                <Skeleton />
                                <Skeleton />
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 1 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                                {/*<li className="valign-wrapper station">*/}
                                {/*    Метро 2 <img className="secondary-content" width="10px"*/}
                                {/*                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"/>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </SkeletonTheme>
                </div>
            </div>
        </div>
    )
}

export default RandomBath;