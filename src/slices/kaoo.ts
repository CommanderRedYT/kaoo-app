import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../store";
import type { KaooState } from "../models/kaoo";

const initialState: KaooState = {
    test: "test",
};

const kaooSlice = createSlice({
    name: "kaoo",
    initialState,
    reducers: {
        setTest: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        }
    }
});

export const updateTest = (test: string): AppThunk => async (dispatch) => {
    dispatch(kaooSlice.actions.setTest(test));
}

export const { reducer: KaooReducer } = kaooSlice;

export default kaooSlice;
