import { createBrowserRouter } from "react-router-dom";
import PortfolioApp from "./components/PortfolioApp/PortfolioApp";
import MainPortfolio from "./components/NavPortfolio/MainPortfolio";
import TodoBoard from "./components/NavPortfolio/ChildPorts/TodoList_Port/TodoBoard";
import ErrorEl from "./components/ErrorElement/ErrorEl";
import Registration from "./components/Registration/Registration";
import Settings from "./components/Settings/Settings";
import {providerPath as path} from "./indexPath" ;


console.log(path.todoBoard())
const routes = createBrowserRouter([
    {
        path: "/",
        element: <PortfolioApp />,
        errorElement: <ErrorEl />,
    },
    {
        path: "/portfolio/signUp",
        element: <Registration state="Sign Up" comp_name="Registration" />,
    },
    {
        path: "/portfolio/signIn",
        element: <Registration state="Sign In" comp_name="Log in" />,
    },
    {
        path: "/portfolio",
        element: <MainPortfolio />,
        children: [
            {
                path: path.todoBoard(),
                element: <TodoBoard />,
            },
            {
                path: path.myChat(),
                element: <TodoBoard />,
            },
            {
                path: path.settings(),
                element: <Settings />,
            },
            {
                path: path.guest(),
                element: <TodoBoard />,
            },
        ],
    },
]);

export default routes;
