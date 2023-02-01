import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../store";
import type { KaooState } from "../models/kaoo";

const initialState: KaooState = {
    goods: null,
    search: null,
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
    }
});

export const updateGoods = (goods: KaooState["goods"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setGoods(goods));
};

export const updateSearch = (search: KaooState["search"]): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setSearch(search));
};

export const { reducer: KaooReducer } = kaooSlice;

export default kaooSlice;
