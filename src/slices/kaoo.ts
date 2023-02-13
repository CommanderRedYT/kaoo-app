import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

import type {AppThunk} from "../store";
import type {CartItem, KaooState, OrderedItem} from "../models/kaoo";
import {DisplayFilter, Good, KaooCart} from "../models/kaoo";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const initialState: KaooState = {
    goods: null,
    search: null,
    cart: {},
    history: null,
    table_num: null,
    adult: 4,
    child: 4,
    shopid: "323",
    filter: DisplayFilter.ALL,
    shopInfo: null,
    orderedItems: [],
    inProgress: false,
};

const kaooSlice = createSlice({
    name: "kaoo",
    initialState,
    reducers: {
        setGoods: (state, action: PayloadAction<KaooState["goods"]>) => {
            state.goods = action.payload;
        },
        setSearch: (state, action: PayloadAction<KaooState["search"]>) => {
            state.search = action.payload;
        },
        setCart: (state, action: PayloadAction<KaooState["cart"]>) => {
            state.cart = action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const productId = action.payload.good.product_id;
            if (state.cart[productId]) {
                state.cart[productId].count++;
            } else {
                state.cart[productId] = action.payload;
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            const productId = action.payload.good.product_id;
            if (state.cart[productId]) {
                state.cart[productId].count--;
                if (state.cart[productId].count <= 0) {
                    delete state.cart[productId];
                }
            }
        },
        deleteFromCart: (state, action: PayloadAction<CartItem>) => {
            const productId = action.payload.good.product_id;
            if (state.cart[productId]) {
                delete state.cart[productId];
            }
        },
        clearCart: (state) => {
            state.cart = {};
        },
        setHistory: (state, action: PayloadAction<KaooState["history"]>) => {
            state.history = action.payload;
        },
        setTableNum: (state, action: PayloadAction<KaooState["table_num"]>) => {
            state.table_num = action.payload;
        },
        setAdult: (state, action: PayloadAction<KaooState["adult"]>) => {
            state.adult = action.payload;
        },
        setChild: (state, action: PayloadAction<KaooState["child"]>) => {
            state.child = action.payload;
        },
        setShopId: (state, action: PayloadAction<KaooState["shopid"]>) => {
            state.shopid = action.payload;
        },
        setFilter: (state, action: PayloadAction<DisplayFilter>) => {
            state.filter = action.payload;
        },
        setShopInfo: (state, action: PayloadAction<KaooState["shopInfo"]>) => {
            state.shopInfo = action.payload;
        },
        setOrderedItems: (state, action: PayloadAction<KaooState["orderedItems"]>) => {
            state.orderedItems = action.payload;
        },
        addOrderedItemToOrderList: (state, action: PayloadAction<OrderedItem>) => {
            state.orderedItems.push(action.payload);
        },
        addOrderToOrderList: (state, action: PayloadAction<KaooCart>) => {
            const cart = action.payload;
            Object.keys(cart).forEach((productId) => {
                const orderedItem: OrderedItem = {
                    product_id: productId,
                    count: cart[productId].count,
                    received: false,
                    uuid: uuidv4(),
                };

                state.orderedItems.push(orderedItem);
            });
        },
        toggleOrderItemReceived: (state, action: PayloadAction<OrderedItem>) => {
            const orderedItem = action.payload;
            const index = state.orderedItems.findIndex((item) => item.uuid === orderedItem.uuid);
            if (index >= 0) {
                state.orderedItems[index].received = !state.orderedItems[index].received;
            }
        },
        setInProgress: (state, action: PayloadAction<boolean>) => {
            state.inProgress = action.payload;
        },
    }
});

export const updateGoods = (goods: KaooState["goods"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setGoods(goods));
};

export const updateSearch = (search: KaooState["search"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setSearch(search));
};

export const updateCart = (cart: KaooState["cart"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setCart(cart));
};

export const addGoodToCart = (good: Good): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.addToCart({good, count: 1}));
};

export const removeGoodFromCart = (good: Good): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.removeFromCart({good, count: 1}));
};

export const deleteGoodFromCart = (good: Good): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.deleteFromCart({good, count: 1}));
};

export const clearCart = (): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.clearCart());
};

export const updateHistory = (history: KaooState["history"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setHistory(history));
};

export const updateTableNum = (table_num: KaooState["table_num"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setTableNum(table_num));
};

export const updateAdult = (adult: KaooState["adult"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setAdult(adult));
};

export const updateChild = (child: KaooState["child"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setChild(child));
};

export const updateShopId = (shopId: KaooState["shopid"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setShopId(shopId));
};

export const updateFilter = (filter: DisplayFilter): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setFilter(filter));
};

export const addGoodToCartByProductId = (productId: string): AppThunk => async (dispatch, getState) => {
    const response = getState().kaoo.goods;
    if (response) {
        const good = response
            .flatMap((category) => category.det)
            .find((good) => good.product_id === productId);
        if (good) {
            dispatch(kaooSlice.actions.addToCart({good, count: 1}));
        }
    }
};

export const addGoodToCartByProductIdIfNotExist = (productId: string): AppThunk => async (dispatch, getState) => {
    const response = getState().kaoo.goods;
    if (response) {
        const good = response
            .flatMap((category) => category.det)
            .find((good) => good.product_id === productId);
        if (good) {
            const cart = getState().kaoo.cart;
            if (!cart[productId]) {
                dispatch(kaooSlice.actions.addToCart({good, count: 1}));
            }
        }
    }
};

export const updateShopInfo = (shopInfo: KaooState["shopInfo"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setShopInfo(shopInfo));
};

export const updateOrderedItems = (orderedItems: KaooState["orderedItems"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setOrderedItems(orderedItems));
};

export const addOrderedItemToOrderList = (orderedItem: OrderedItem): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.addOrderedItemToOrderList(orderedItem));
};

export const addOrderToOrderList = (cart: KaooCart): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.addOrderToOrderList(cart));
};

export const toggleOrderItemReceived = (orderedItem: OrderedItem): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.toggleOrderItemReceived(orderedItem));
};

export const updateInProgress = (inProgress: boolean): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setInProgress(inProgress));
};

export const { reducer: KaooReducer } = kaooSlice;

export default kaooSlice;
