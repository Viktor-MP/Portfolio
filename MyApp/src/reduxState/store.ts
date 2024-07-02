import {configureStore} from "@reduxjs/toolkit";
import modeReducer from "./lightModeSlice"

export const store = configureStore({
    reducer: {
        lightMode: modeReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;