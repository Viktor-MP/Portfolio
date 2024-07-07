import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface lightModeType {
    lightMode: boolean;
}

const initialState: lightModeType = {
    lightMode: true,
};

const lightModeSlice = createSlice({
    name: "isLightMode",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload)
            state.lightMode = action.payload;
        },
    },
});
export const { setMode } = lightModeSlice.actions;

export default lightModeSlice.reducer;
