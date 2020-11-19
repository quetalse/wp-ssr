import Home from './client/pages/Home';
import About from "./client/pages/About";
import Todo from "./client/pages/Todo";
import NotFound from "./client/pages/NotFound";
import Bathrooms from "./client/pages/Bathrooms";
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
                path: '/bathrooms'
            },
            {
                ...About,
                path: '/about',
            },
            {
                ...Todo,
                path: '/todo',
            },
            {
                ...NotFound
            }
        ]

    }
]