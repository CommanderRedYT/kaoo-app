import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../store";
import type { SettingsState } from "../models/settings";

const initialState: SettingsState = {
    useDarkMode: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUseDarkMode: (state, action: PayloadAction<boolean>) => {
            state.useDarkMode = action.payload;
        }
    }
});

export const updateUseDarkMode = (useDarkMode: boolean): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.setUseDarkMode(useDarkMode));
};

export const { reducer: SettingsReducer } = settingsSlice;

export default settingsSlice;
