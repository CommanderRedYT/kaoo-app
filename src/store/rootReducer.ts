import { combineReducers } from "@reduxjs/toolkit";
import { KaooReducer } from "../slices/kaoo";
import { SettingsReducer } from "../slices/settings";

export const rootReducer = combineReducers({
    kaoo: KaooReducer,
    settings: SettingsReducer,
});
