import {configureStore} from "@reduxjs/toolkit";
import signInReducer from "./signInSlice"

export const store = configureStore({
    reducer: {
        isRegistered: signInReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;