import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IAppStates {
    addingNew: boolean;
    language: string;
}
const initialState: IAppStates = {
    addingNew: true,
    language: "fa"
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAddingNew: (state, action: PayloadAction<any>) => {
            state.addingNew = action.payload;
        },
        setLanguage: (state, action: PayloadAction<any>) => {
            state.language = action.payload;
        },
    }
})

export const { setAddingNew, setLanguage } = appSlice.actions;

export const selectAddingNew = (state: RootState) => state.app.addingNew;
export const selectLanguage = (state: RootState) => state.app.language;

export default appSlice.reducer;