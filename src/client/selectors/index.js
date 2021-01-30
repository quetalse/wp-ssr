import { createSelector } from 'reselect'

export const getClassifierByTitle = title => state => {
    if(!state.classifiers[title]) return {}
    return state.classifiers[title]
};

export const getClassifiersByTitles = titles => state => {
    let data = {};
    titles.forEach(title => {
        if(state.classifiers[title]) {
            data[title] = state.classifiers[title].data
        }
    })
    return data;
};

export const getClassifiersLengthByTitles = titles => state => {
    let length = 0;
    titles.forEach(classifierTitle => {
        const classifierData = state.classifiers[classifierTitle] || {};
        if(classifierData.data) length += 1
    })
    // console.log('length', length);

    return length;
};

export const getPageData = state => state.page;
export const getRouteData = state => state.route;
export const getTopCategories= state => state.topCategories;