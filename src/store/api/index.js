import fetch from "node-fetch";
import { Base64 } from 'js-base64';

const username = process.env.SWAGGER_USER;
const password = process.env.SWAGGER_PSWD;

export const fetchData = async (haveName = false, {name, url}) => {
    const encoder = Base64.encode(`${username}:${password}`)

    try {
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
        const result = await response.json();
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

// haveName - ? - если набо данных имеет вложенность (соежржит подмассив урлов) фунция возвращет объект с ключом по имени вложенных урлов, иначе - простой объект - ДЛЯ избежания доп вложености
// return topCategories: {
//     ....
// } or return {...}