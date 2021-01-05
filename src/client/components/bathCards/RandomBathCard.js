import React from 'react';

const RandomBathCard = ({bath}) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="http://sk-pestovo.ru/assets/images/articles/sauna-v-dome.jpg"/>
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

export default RandomBathCard;