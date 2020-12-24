import React, { useState, useEffect } from 'react';
import Skeleton from './skeletons/RandomBath';
import { useDispatch, useSelector } from "react-redux";
import { sagaFetchHome } from "../../../store/actions/home";

const RandomBath = ({bathroomCard}) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
                <span className="card-head card-price">{bathroomCard[4]} р.</span>
                <span className="card-head card-mark">{bathroomCard[3]}</span>
            </div>
            <div className="card-content left-align">
                <p className="content-title">{bathroomCard[0]}</p>
                <p className="content-type">{bathroomCard[1]}</p>
                <ul className="content-stations">
                    {bathroomCard[2].map((metro, index) => {
                        return (
                            <li key={index} className="valign-wrapper station">{metro[0]} ({metro[1]})
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Moscow_Metro.svg/1280px-Moscow_Metro.svg.png"
                                    className="secondary-content" width="10px"/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const RandomBathrooms = ({routes}) => {
    const dispatch = useDispatch();

    const randomBathrooms = useSelector(state => {
        if(!state.home.data.randomBathrooms){
            return null
        }
        return state.home.data.randomBathrooms.randomBathrooms
    });

    useEffect(() => {
            if(!randomBathrooms){
                const url = routes.filter((route)=>{
                    return route.name === 'randomBathrooms'
                });
                dispatch(sagaFetchHome(url))
            }
        },[]
    );

    const generateCards = (array, skeleton= false) => {
        return array.map((bath, index) => {
                if(!skeleton) {
                    return (
                      <div key={index}>
                          <RandomBath key={index} bathroomCard={bath}/>
                      </div>
                    )
                }
                else {
                    return (
                        <div key={index}>
                            <Skeleton key={index}/>
                        </div>
                    )
                }
            })
    }

    return (
        <React.Fragment>
            {randomBathrooms ? generateCards(randomBathrooms) : generateCards([1, 2, 3, 4], true)}
        </React.Fragment>
    )
}

export default RandomBathrooms;