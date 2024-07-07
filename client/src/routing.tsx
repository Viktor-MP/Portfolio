import { createBrowserRouter } from "react-router-dom";
import { providerPath as path } from "./routingPath";


import PortfolioApp from "./components/PortfolioApp/Portfolio";
import MainPortfolio from "./components/NavPortfolio/MainPortfolio";
import TodoBoard from "./components/NavPortfolio/ChildPorts/TodoBoard/TodoBoard";
import ErrorEl from "./components/ErrorElement/ErrorEl";
import Registration from "./components/Registration/Registration";
import Settings from "./components/Settings/Settings";

const routes = createBrowserRouter([
    {
        path: path.base,
        element: <PortfolioApp />,
        errorElement: <ErrorEl />,
    },
    {
        path: path.signUp(),
        element: <Registration state="Sign Up" comp_name="Registration" />,
    },
    {
        path: path.signIn(),
        element: <Registration state="Sign In" comp_name="Log in" />,
    },
    {
        path: path.port,
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
