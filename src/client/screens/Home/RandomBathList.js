import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sagaFetchHome } from "../../../store/actions/home";
import Skeleton from '../../components/skeletons/RandomBathCard';
import { BathroomCardRandom } from "../../components/BathroomCardRandom";

export const RandomBathList= ({routes}) => {
    const dispatch = useDispatch();
    const [randomBathrooms, setRandomBathrooms] = useState({
        data: null,
        loading: false,
        error: false
    });

    useEffect(async () => {
            let url = routes.filter((route) => {
                return route.name === "randomBathrooms"
            });

            setRandomBathrooms((state) =>({...state, loading: true}))
            try{
                const response = await fetch(url[0].url);
                const data = await response.json();
                setRandomBathrooms((state) =>({...state, data}))
            }catch (error) {
                setRandomBathrooms((state) =>({...state, error}))
            }
        },[]
    );

    const generateCards = (array, skeleton= false) => {
        return array.map((bath, index) => {
                if(!skeleton) {
                    return (
                      <div key={index}>
                          <BathroomCardRandom key={index} bath={bath}/>
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
        <Fragment>
            {randomBathrooms.data ? generateCards(randomBathrooms.data) : generateCards([1, 2, 3, 4], true)}
        </Fragment>
    )
}