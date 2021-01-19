import { call } from 'redux-saga/effects';
import { fetchData } from "../api";

export function* dataExtract(dataUrls, name = false){
    let data;
    try {
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
