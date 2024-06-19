import { createSlice } from "@reduxjs/toolkit";

export interface signInState {
    registered: boolean;
    as: string;
}

const initialState: signInState = {
    registered: false,
    as: "guest",
};

const signInSlice = createSlice({
    name: "isRegistered",
    initialState,
    reducers: {
        setRegister: (state, action) => {
            console.log(state, action);
            (state.registered = action.payload.registered),
                (state.as = action.payload.as);
        },
    },
});
export const {setRegister} = signInSlice.actions;

export default signInSlice.reducer;
