import fetch from "node-fetch";
import { Base64 } from 'js-base64';

let username = process.env.SWAGGER_USER;
let password = process.env.SWAGGER_PSWD;

export const fetchData = async (haveName = false, {name, url}) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        agent: null,
        headers: {
            "Content-Type": 'text/json',
            'Authorization': 'Basic ' + Base64.encode(`${username}:${password}`),
        },
    });
    const result = await response.json();

    if(response.status >= 400){
        console.log('result', result)
        throw new Error(result.error)
    }

    // console.log({
    //     [name]: result
    // })

    if(haveName) return {[name]: result}
    else{
       return result
    }
}

// haveName - ? - если набо данных имеет вложенность (соежржит подмассив урлов) фунция возвращет объект с ключом по имени вложенных урлов, иначе - простой объект - ДЛЯ избежания доп вложености
// return topCategories: {
//     ....
// } or return {...}