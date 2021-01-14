import React from 'react';

const NotFound = ({staticContext = {}}) => {

    staticContext.notFound = true;

    return (
        <div>
            <h1>NotFound</h1>
        </div>
    )
}

export default {
    component: NotFound
};