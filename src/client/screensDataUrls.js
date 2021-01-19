const _apiBase = process.env.__API_BASE__;

// Данные и формат для загрузки на сервере(формируем state на сервере)
const serverSagaData = {
   homePage: {
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page/home`},
            {name: 'count', url: `${_apiBase}/api/page/home?count`},
        ]
    },
    searchPage: {
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page/search`},
            {name: 'count', url: `${_apiBase}/api/page/search?count`}
        ]
    },
    topCategories: {
       name: 'topCategories',
        url: `${_apiBase}/api/page/home?top-categories`
   }
};

const clientSagaData = {
    classifiers: {
        name: 'classifiers',
        url:[
            {name: 'types', url: 'http://localhost:3000/data/classifiers/type.json'},
            {name: 'metro', url: 'http://localhost:3000/data/classifiers/metro.json'},
            {name: 'purpose', url: 'http://localhost:3000/data/classifiers/purpose.json'},
            {name: 'services', url: 'http://localhost:3000/data/classifiers/services.json'},
            {name: 'aqua', url: 'http://localhost:3000/data/classifiers/aqua.json'},
            {name: 'entertainment', url: 'http://localhost:3000/data/classifiers/entertainment.json'}
        ]
    },
    randomBathrooms: {
        name: 'randomBathrooms',
        url: `${_apiBase}/api/random-baths?count`
    }
}



export const homeDataUrls = {
    serverSagaData: [
        serverSagaData.homePage,
        serverSagaData.topCategories,
    ],
    clientSagaData:
        [


        // serverSagaData.homePage,
        serverSagaData.topCategories,

        clientSagaData.classifiers,
        clientSagaData.randomBathrooms,
    ]
    // {
    //
    // }
};

export const searchDaraUrls = {
    serverSagaData: [
        serverSagaData.searchPage
    ],
    clientSagaData: [
        serverSagaData.searchPage,
        clientSagaData.classifiers,
    ]
}