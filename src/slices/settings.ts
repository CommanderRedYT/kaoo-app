import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../store";
import type { SettingsState } from "../models/settings";

const initialState: SettingsState = {
    useDarkMode: false,
    settingsLoaded: false,
    favorites: [],
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUseDarkMode: (state, action: PayloadAction<boolean>) => {
            state.useDarkMode = action.payload;
        },
        setSettingsLoaded: (state, action: PayloadAction<boolean>) => {
            state.settingsLoaded = action.payload;
        },
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.favorites = action.payload;
        },
        addToFavorites: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.favorites) {
                state.favorites.push(productId);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.favorites) {
                state.favorites = state.favorites.filter((id) => id !== productId);
            }
        }
    }
});

export const updateUseDarkMode = (useDarkMode: boolean): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.setUseDarkMode(useDarkMode));
};

export const updateSettingsLoaded = (settingsLoaded: boolean): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.setSettingsLoaded(settingsLoaded));
};

export const updateFavorites = (favorites: string[]): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.setFavorites(favorites));
};

export const addFavorite = (productId: string): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.addToFavorites(productId));
};

export const removeFavorite = (productId: string): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.removeFromFavorites(productId));
};

export const { reducer: SettingsReducer } = settingsSlice;

export default settingsSlice;
