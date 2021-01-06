import fetch from "node-fetch";

export const fetchData = async ({name, url}) => {

    // console.log('url', url)

    const response = await fetch(url);
    const result = await response.json();
    //     {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }) .then(function(response){
    //     console.log(response)
    //     return response.json();
    // })
    //     .then(function(myJson) {
    //         console.log(myJson);
    //     });

    // console.log('result', result)
    return {
        [name]: result
    };
}