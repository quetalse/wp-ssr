import { createServer, Model } from "miragejs";


export function makeServer({ environment = "test" } = {}) {

    // console.log('Start mock')
    return createServer({
        environment,
        models: {
            user: Model,
        },
        seeds(server) {
            server.create("user", { name: "Bob" })
            server.create("user", { name: "Alice" })
        },
        routes() {
            this.namespace = "api"

            this.get("/goods", (schema) => {
                return [
                    { id: "1", title: "Товар 1", thumbnailUrl:  "https://via.placeholder.com/150/92c952"},
                    { id: "2", title: "Товар 2", thumbnailUrl:  "https://via.placeholder.com/150/771796"},
                    { id: "3", title: "Товар 3", thumbnailUrl:  "https://via.placeholder.com/150/24f355" },
                    { id: "4", title: "Товар 4", thumbnailUrl:  "https://via.placeholder.com/150/d32776" },
                ]
            });
            this.get("/goods/meta", (schema) => {
                return {
                    title: "Great good",
                    description: "Goods for productive work",
                    keywords:  "good work realize",
                    site_name: "great goods stuff site"
                }
            });

            this.get("/page/:page", (schema, request) => {

                let page = request.params.page;
                let query = request.queryParams;

                console.log('query', query)

                if (page === "home"){
                    if(Object.keys(query).length === 0){
                        return {
                            title: "title",
                            description: "description",
                            keywords:  "good work realize",
                            site_name: "great goods stuff site",
                            // count: 6,
                            h1: "Заголовок",
                            slogan: "Слоган",
                            text: "Бани и сауны всегда были достаточно востребованы у тех, кто прежде всего заботится о своём здоровье, а также любит приятно проводить своё время в кругу друзей. В современном мире существует огромная разновидность бань и саун, которые могут удовлетворить капризы самых придирчивых гостей. К тому же, стоит отметить благоприятное влияние парилок на физическое и ментальное здоровье человека."
                        }
                    }else{
                        if(query['count']){
                            return {
                                count: 6
                            }
                        }else if(query['top-categories']){
                            return {
                                topCategories: {
                                    type: {
                                        title: 'Типы бань',
                                        list: [
                                            'На дровах (100)',
                                            'Финская (80)',
                                            'Хамам (60)',
                                            'Турецкая (50)'
                                        ]
                                    },
                                    purpose: {
                                        title: 'Назначение',
                                        list: [
                                            'На двоих (100)',
                                            'Корпоратив (80)',
                                            'Семейная (60)',
                                            'Детская (50)'
                                        ]
                                    },
                                    service: {
                                        title: 'Услуги',
                                        list: [
                                            'Банщик (100)',
                                            'Массаж (80)',
                                            'Тапочки (60)',
                                            'Кухни (50)'
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }else{
                    return {
                        test: "test"
                    }
                }
            });
        }
    })
}
