import { createBrowserRouter } from "react-router-dom";
import PortfolioApp from "./components/PortfolioApp/PortfolioApp";
import MainPortfolio from "./components/NavPortfolio/MainPortfolio";
import TodoList from "./components/NavPortfolio/ChildPorts/TodoList_Port/TodoList";
import ErrorEl from "./components/ErrorElement/ErrorEl";
import Registration from "./components/Registration/Registration";
import Settings from "./components/Settings/Settings";


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
                path: "/portfolio/todoList",
                element: <TodoList />,
            },
            {
                path: "/portfolio/myChat",
                element: <TodoList />,
            },
            {
                path: "/portfolio/settings",
                element: <Settings />,
            },
            {
                path: "/portfolio/guest/",
                element: <TodoList />,
            },
        ],
    },
]);

export default routes;
