import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../store";
import type { SettingsState } from "../models/settings";
import {CartItem, KaooCart} from "../models/kaoo";

const initialState: SettingsState = {
    useDarkMode: false,
    settingsLoaded: false,
    favorites: [],
    saved_carts: [],
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
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.favorites) {
                if (state.favorites.includes(productId)) {
                    state.favorites = state.favorites.filter((id) => id !== productId);
                } else {
                    state.favorites.push(productId);
                }
            }
        },
        addSavedCart: (state, action: PayloadAction<KaooCart>) => {
            const cart = action.payload;
            if (state.saved_carts) {
                state.saved_carts.push(cart);
            }
        },
        addIfnotExistsSavedCart: (state, action: PayloadAction<KaooCart>) => {
            const cart = action.payload;
            if (state.saved_carts) {
                if (!state.saved_carts.includes(cart)) {
                    state.saved_carts.push(cart);
                }
            }
        },
        removeSavedCart: (state, action: PayloadAction<KaooCart>) => {
            const cart = action.payload;
            if (state.saved_carts) {
                state.saved_carts = state.saved_carts.filter((c) => c !== cart);
            }
        },
        clearSavedCarts: (state) => {
            state.saved_carts = [];
        },
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

export const toggleFavorite = (productId: string): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.toggleFavorite(productId));
};

export const addSavedCart = (cart: KaooCart): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.addSavedCart(cart));
};

export const addIfNotExistsSavedCart = (cart: KaooCart): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.addIfnotExistsSavedCart(cart));
}

export const removeSavedCart = (cart: KaooCart): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.removeSavedCart(cart));
};

export const clearSavedCarts = (): AppThunk => async (dispatch) => {
    dispatch(settingsSlice.actions.clearSavedCarts());
};

export const { reducer: SettingsReducer } = settingsSlice;

export default settingsSlice;
