import fetch from "node-fetch";

export const fetchData = async ({name, url}) => {
    const response = await fetch(url);
    const result = await response.json();

    if(response.status >= 400){
        console.log('result', result)
        throw new Error(result.error)
    }

    return {
        [name]: result
    };
}