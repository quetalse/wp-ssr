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
        if(state.classifiers[classifierTitle]) length += 1
    })
    return length;
};

export const getPageData = state => state.page;
export const getRouteData = state => state.route;
export const getTopCategories= state => state.topCategories;