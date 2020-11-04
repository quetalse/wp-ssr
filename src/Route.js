import Home from './pages/Home';
import About from "./pages/About";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import App from './App';


console.log(Home)
console.log(About)
console.log(Todo)
console.log(NotFound)

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