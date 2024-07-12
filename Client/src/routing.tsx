import { createBrowserRouter } from "react-router-dom";
import { providerPath as path } from "./routingPath";

import TodoBoard from "./components/Boards/TodoBoard/TodoBoard";
import MainPortfolio from "./components/Main/Main";
import Registration from "./components/Registration/Registration";
import ErrorEl from "./components/Error/Error";
import Settings from "./components/Boards/SettingsBoard/Settings";
import PortfolioApp from "./components/Intro/Intro";

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
