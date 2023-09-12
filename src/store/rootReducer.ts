import { combineReducers } from '@reduxjs/toolkit';
import { KaooReducer } from '@src/slices/kaoo';
import { SettingsReducer } from '@src/slices/settings';

export const rootReducer = combineReducers({
    kaoo: KaooReducer,
    settings: SettingsReducer,
});
