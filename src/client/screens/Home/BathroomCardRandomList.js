import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sagaFetchHome } from "../../../store/actions/home";
import Skeleton from '../../components/skeletons/RandomBathCard';
import { BathroomCardRandom } from "../../components/BathroomCard/BathroomCardRandom";
import { homeDataUrls } from '../../screensDataUrls'
import {sagaFetchClassifier} from "../../../store/actions/classifier";
import { fetchData } from "../../../store/api";
import {getClassifiersByTitles} from "../../selectors";

const {clientSagaData} = homeDataUrls;
export const BathroomCardRandomList = ({classifierTitles}) => {

    const dispatch = useDispatch();
    const classifiers = useSelector(getClassifiersByTitles(classifierTitles));

    const [randomBathrooms, setRandomBathrooms] = useState({
        data: null,
        loading: false,
        error: false
    });

    useEffect(() => {
            classifierTitles.map((classifierTitle) => {
                if(!classifiers[classifierTitle]) {
                    dispatch(sagaFetchClassifier(classifierTitle))
                }
            })
        },[]
    );

    useEffect( () => {
            const getRandomBathrooms = async() => {
                setRandomBathrooms((state) =>({...state, loading: true}))
                try{
                    const data = await fetchData(clientSagaData.randomBathrooms);
                    setRandomBathrooms((state) =>({...state, data}))
                }catch (error){
                    setRandomBathrooms((state) =>({...state, error}))
                }
            }
            getRandomBathrooms();
        },[]
    );

    const loadedClassifiers = classifierTitles.filter(classifierTitle => classifiers[classifierTitle]);
    const isReadyClassifiers = loadedClassifiers.length === classifierTitles.length;

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
            {(randomBathrooms.data && isReadyClassifiers) ?
                generateCards(randomBathrooms.data) :
                generateCards([1, 2, 3, 4], true)}
        </Fragment>
    )
}