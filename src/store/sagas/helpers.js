import { call } from 'redux-saga/effects';
import { fetchData } from "../api";

const _apiBase = process.env.__API_BASE__;
export function* dataExtract(dataUrls, name = false){
    let data;
    try {
        // console.log('dataUrls', dataUrls)
        const responses = yield dataUrls.map(dataUrl => {
            if(Array.isArray(dataUrl.url)){
                return call(dataExtract, dataUrl.url, dataUrl.name)
            }
            return call(fetchData, name, dataUrl)
        });
        yield responses.map(response => {
            data = {...data,...response}
        })
        // if(name) return {[name]: data}
        // else{
        //     return data;
        // }
        return data;

    }catch (e) {
        throw e
    }
}

export const dataPageTemplate = (route) => ([{
    name: "page",
    url: `${_apiBase}/api/page${route}`
}])

export const dataClassifierTemplate = (classifier) => ([{
    name: "classifiers",
    url: [{
        name: `${classifier}`,
        url:`/data/classifiers/${classifier}.json`
    }]
}])

export const dataTopCategoriesTemplate = route => ([{
    name: "topCategories",
    url: `${route}`
}])
