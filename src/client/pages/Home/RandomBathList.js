import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sagaFetchHome } from "../../../store/actions/home";
import Skeleton from '../../components/skeletons/RandomBathCard';
import RandomBathCard from "../../components/bathCards/RandomBathCard";

const RandomBathList= ({routes}) => {
    const dispatch = useDispatch();
    const randomBathrooms = useSelector(state => state.data.randomBathrooms);

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
                          <RandomBathCard key={index} bath={bath}/>
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
            {randomBathrooms ? generateCards(randomBathrooms) : generateCards([1, 2, 3, 4], true)}
        </Fragment>
    )
}

export default RandomBathList;