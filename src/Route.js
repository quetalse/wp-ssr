import App from './client/App';
import Home from './client/screens/Home';
import Search from './client/screens/Search';
import Adaptor from './client/screens/Adaptor'
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
            {
                ...Adaptor,
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