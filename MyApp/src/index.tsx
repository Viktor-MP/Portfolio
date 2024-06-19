import React from "react";
import ReactDOM from "react-dom/client";

// router dome provider
import { RouterProvider } from "react-router-dom";

// redux toolkit provider
import { Provider } from "react-redux";
import { store } from "./reduxState/store";

import routes from "./indexProvider";
import "./index.css";
import "./App.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
);
