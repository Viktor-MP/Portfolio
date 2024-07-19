import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { providerPath as path } from "./routingPath";

const Main = lazy(() =>
    import("./components/Main/Main")
);
const ErrorEl = lazy(() =>
    import("./components/Error/Error")
);
const Intro = lazy(() =>
    import("./components/Intro/Intro")
);
const Registration = lazy(() =>
    import("./components/Registration/Registration")
);

const TodoBoard = lazy(() =>
    import("./components/Boards/TodoBoard/TodoBoard")
);

const Settings = lazy(() =>
    import("./components/Boards/SettingsBoard/Settings")
);

const routes = createBrowserRouter([
    {
        path: path.base,
        element: (
            <Suspense fallback={<p>Loading...</p>}>
                <Intro />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<p>Loading...</p>}>
                <ErrorEl />
            </Suspense>
        ),
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
        element: <Main />,
        children: [
            {
                path: path.todoBoard(),
                element: <TodoBoard />,
            },
            {
                path: path.todoBoard() + "/board/:id",
                element: <Settings />,
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
