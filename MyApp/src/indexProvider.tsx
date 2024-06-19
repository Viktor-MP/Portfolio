import { createBrowserRouter } from "react-router-dom";
import PortfolioApp from "./components/PortfolioApp/PortfolioApp";
import MainPortfolio from "./components/NavPortfolio/MainPortfolio";
import TodoList from "./components/NavPortfolio/ChildPorts/TodoList_Port/TodoList";
import ErrorEl from "./components/ErrorElement/ErrorEl";
import Registration from "./components/Registration/Registration";

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
        path: "/portfolio/:userStatus",
        element: <MainPortfolio />,
        children: [
            {
                path: "/portfolio/:userStatus/todoList",
                element: <TodoList />,
            },
            // {
            //     path: "/portfolio/:userStatus/todoList",
            //     element: <TodoList />,
            // },
        ],
    },
]);

export default routes;
