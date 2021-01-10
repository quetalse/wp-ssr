import App from './client/App';
import Home from './client/pages/Home';
import Search from './client/pages/Search';
import Category from './client/pages/Category';
import About from "./client/pages/About";
import NotFound from "./client/pages/NotFound";

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
                ...Category,
                path: '/category',
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