import Home from './client/pages/Home';
import About from "./client/pages/About";
import NotFound from "./client/pages/NotFound";
import Bathrooms from "./client/pages/Bathrooms";
import Bathroom from "./client/pages/Bathroom";
import App from './client/App';

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: '/',
                exact: true
            }, {
                ...Bathrooms,
                path: '/bathrooms',
                exact: true,
            },
            {
                path: "/bathrooms/:id",
                ...Bathroom
            },
            {
                ...About,
                path: '/about',
            },
            {
                ...NotFound
            }
        ]

    }
]