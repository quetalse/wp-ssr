import fetch from "node-fetch";
import topCategories from "../reducers/topCategories";

export const fetchData = async (haveName = false, {name, url}) => {
    const response = await fetch(url);
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