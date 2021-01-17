import React from 'react';

export const BathroomCardRandom = ({bath}) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={bath[5]}/>
                <span className="card-head card-price">{bath[4]} р.</span>
                <span className="card-head card-mark">{bath[3]}</span>
            </div>
            <div className="card-content left-align">
                <p className="content-title">{bath[0]}</p>
                <p className="content-type">{bath[1]}</p>
                <ul className="content-stations">
                    {bath[2].map((metro, index) => {
                        return (
                            <li key={index} className="valign-wrapper station">{metro[0]} ({metro[1]})
                                <img
                                    src="app/images/icons/metro.png"
                                    className="secondary-content" width="10px"/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}