import Home from './client/pages/Home';
import Search from './client/pages/Search';
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
            },
            {
                ...Search,
                path: '/search',
                exact: true,
            },
            {
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