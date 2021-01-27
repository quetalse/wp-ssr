import fetch from "node-fetch";
import { Base64 } from 'js-base64';

const username = process.env.SWAGGER_USER;
const password = process.env.SWAGsGER_PSWD;

export const sagaFetchData = async (haveName = false, {name, url}) => {
    try {
        const result = await fetchData(url);
        if(haveName) return {[name]: result}
        return result
    }catch(err){
        throw err
    }

    // console.log('response', response)
    // // console.log(response.error)
    //
    // if(response.status >= 400){
    //     console.log('ressdsdult')
    //     throw new Error(result.error)
    // }

}

export const fetchData = async (url) => {
    const encoder = Base64.encode(`${username}:${password}`)
    // console.log('url', url);
    const response = await fetch(url, {
        method: 'GET',
        // credentials: 'same-origin',
        // redirect: 'follow',
        // agent: null,
        headers: {
            "Content-Type": 'text/json',
            'Authorization': `Basic ${encoder}`,
        },
    });
    return await response.json();
}

// haveName - ? - если набо данных имеет вложенность (соежржит подмассив урлов) фунция возвращет объект с ключом по имени вложенных урлов, иначе - простой объект - ДЛЯ избежания доп вложености
// return topCategories: {
//     ....
// } or return {...}