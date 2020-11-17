import Home from './pages/Home';
import About from "./pages/About";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import Bathrooms from "./pages/Bathrooms";
import App from './App';

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