import { combineReducers } from "@reduxjs/toolkit";
import { KaooReducer } from "../slices/kaoo";

export const rootReducer = combineReducers({
    kaoo: KaooReducer,
});
