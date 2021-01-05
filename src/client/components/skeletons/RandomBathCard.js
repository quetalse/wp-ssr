import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RandomBathCard = () => {
    return (
          <SkeletonTheme color="#a4b4bc" highlightColor="#94a7b0">
            <div className="card">
                <div className="card-image">
                    <Skeleton height={134}/>
                </div>
                <div className="card-content left-align">
                    <p className="content-title"><Skeleton/></p>
                    <p className="content-type"><Skeleton/></p>
                    <ul className="content-stations">
                        <Skeleton count={2} />
                    </ul>
                </div>
            </div>
        </SkeletonTheme>
    )


}

export default RandomBathCard;