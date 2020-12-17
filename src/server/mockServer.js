import { createServer, Model } from "miragejs";


export function makeServer({ environment = "test" } = {}) {

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

            this.get("/page/meta", (schema) => {
                return {
                    title: "Great good",
                    description: "Goods for productive work",
                    keywords:  "good work realize",
                    site_name: "great goods stuff site"
                }
            });
        }
    })
}
