import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AppThunk } from '@src/store';
import type { AppOrderHistoryItem, SettingsState } from '@src/models/settings';
import type { KaooCart, OrderedItem } from '@src/models/kaoo';
import { v4 as uuidv4 } from 'uuid';

const initialState: SettingsState = {
    useDarkMode: false,
    settingsLoaded: false,
    favorites: [],
    saved_carts: [],
    table_num: null,
    orderedItems: [],
    appOrderHistory: [],
};

const settingsSlice = createSlice({
    name: 'settings',
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
                state.favorites = state.favorites.filter(
                    id => id !== productId,
                );
            }
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.favorites) {
                if (state.favorites.includes(productId)) {
                    state.favorites = state.favorites.filter(
                        id => id !== productId,
                    );
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
                console.log(
                    'removeSavedCart',
                    state.saved_carts,
                    state.saved_carts.filter(
                        c => JSON.stringify(c) !== JSON.stringify(cart),
                    ),
                );
                state.saved_carts = state.saved_carts.filter(
                    c => JSON.stringify(c) !== JSON.stringify(cart),
                );
            }
        },
        clearSavedCarts: state => {
            state.saved_carts = [];
        },
        setSavedCarts: (state, action: PayloadAction<KaooCart[]>) => {
            state.saved_carts = action.payload;
        },
        setTableNum: (
            state,
            action: PayloadAction<SettingsState['table_num']>,
        ) => {
            state.table_num = action.payload;
        },
        setOrderedItems: (
            state,
            action: PayloadAction<SettingsState['orderedItems']>,
        ) => {
            state.orderedItems = action.payload;
        },
        addOrderedItemToOrderList: (
            state,
            action: PayloadAction<OrderedItem>,
        ) => {
            state.orderedItems.push(action.payload);
        },
        addOrderToOrderList: (state, action: PayloadAction<KaooCart>) => {
            const cart = action.payload;
            Object.keys(cart).forEach(productId => {
                const orderedItem: OrderedItem = {
                    product_id: productId,
                    count: cart[productId].count,
                    received: false,
                    cost: parseFloat(cart[productId].good.cost),
                    uuid: uuidv4(),
                };

                state.orderedItems.push(orderedItem);
            });
        },
        toggleOrderItemReceived: (
            state,
            action: PayloadAction<OrderedItem>,
        ) => {
            const orderedItem = action.payload;
            const index = state.orderedItems.findIndex(
                item => item.uuid === orderedItem.uuid,
            );
            if (index >= 0) {
                state.orderedItems[index].received =
                    !state.orderedItems[index].received;
            }
        },
        setAppOrderHistory: (
            state,
            action: PayloadAction<SettingsState['appOrderHistory']>,
        ) => {
            state.appOrderHistory = action.payload;
        },
        addAppOrderHistory: state => {
            const item: AppOrderHistoryItem = {
                orderedItems: state.orderedItems,
                date: new Date().toISOString(),
                totalCost: state.orderedItems.reduce(
                    (acc, item) => acc + item.count * item.cost,
                    0,
                ),
            };

            state.appOrderHistory.push(item);
            state.orderedItems = [];
        },
    },
});

export const updateUseDarkMode =
    (useDarkMode: boolean): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setUseDarkMode(useDarkMode));
    };

export const updateSettingsLoaded =
    (settingsLoaded: boolean): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setSettingsLoaded(settingsLoaded));
    };

export const updateFavorites =
    (favorites: string[]): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setFavorites(favorites));
    };

export const addFavorite =
    (productId: string): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.addToFavorites(productId));
    };

export const removeFavorite =
    (productId: string): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.removeFromFavorites(productId));
    };

export const toggleFavorite =
    (productId: string): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.toggleFavorite(productId));
    };

export const addSavedCart =
    (cart: KaooCart): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.addSavedCart(cart));
    };

export const addIfNotExistsSavedCart =
    (cart: KaooCart): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.addIfnotExistsSavedCart(cart));
    };

export const removeSavedCart =
    (cart: KaooCart): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.removeSavedCart(cart));
    };

export const clearSavedCarts = (): AppThunk => async dispatch => {
    dispatch(settingsSlice.actions.clearSavedCarts());
};

export const updateSavedCarts =
    (saved_carts: KaooCart[]): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setSavedCarts(saved_carts));
    };

export const updateTableNum =
    (table_num: SettingsState['table_num']): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setTableNum(table_num));
    };

export const updateOrderedItems =
    (orderedItems: SettingsState['orderedItems']): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setOrderedItems(orderedItems));
    };

export const addOrderedItemToOrderList =
    (orderedItem: OrderedItem): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.addOrderedItemToOrderList(orderedItem));
    };

export const addOrderToOrderList =
    (cart: KaooCart): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.addOrderToOrderList(cart));
    };

export const toggleOrderItemReceived =
    (orderedItem: OrderedItem): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.toggleOrderItemReceived(orderedItem));
    };

export const updateAppOrderHistory =
    (appOrderHistory: SettingsState['appOrderHistory']): AppThunk =>
    async dispatch => {
        dispatch(settingsSlice.actions.setAppOrderHistory(appOrderHistory));
    };

export const addAppOrderHistory = (): AppThunk => async dispatch => {
    dispatch(settingsSlice.actions.addAppOrderHistory());
};

export const { reducer: SettingsReducer } = settingsSlice;

export default settingsSlice;
