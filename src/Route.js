import App from './client/App';
import Home from './client/screens/Home';
import Search from './client/screens/Search';
import About from "./client/screens/About";
import NotFound from "./client/screens/NotFound";

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
            // {
            //     ...Category,
            //     path: '/category',
            // },
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