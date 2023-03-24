import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store';
import {updateSettingsLoaded, updateUseDarkMode, updateFavorites, updateSavedCarts} from '../slices/settings';
import {SettingsState} from '../models/settings';
import {Appearance} from 'react-native';
import {updateOrderedItems} from '../slices/settings';

const defaultSettings: SettingsState = {
    useDarkMode: Appearance.getColorScheme() === 'dark',
    settingsLoaded: false,
    favorites: [],
    saved_carts: [],
    table_num: null,
    orderedItems: [],
};

export function loadSettings() {
    AsyncStorage.getItem('settings').then((settings) => {
        console.log('settings', settings, !!settings);
        if (settings) {
            const { useDarkMode, favorites, saved_carts, orderedItems } = JSON.parse(settings);
            store.dispatch(updateUseDarkMode(useDarkMode ?? defaultSettings.useDarkMode));
            console.log('favorites', favorites);
            store.dispatch(updateFavorites(favorites ?? defaultSettings.favorites));
            store.dispatch(updateSettingsLoaded(true));
            store.dispatch(updateSavedCarts(saved_carts ?? defaultSettings.saved_carts));
            store.dispatch(updateOrderedItems(orderedItems ?? []));
        } else {
            store.dispatch(updateUseDarkMode(defaultSettings.useDarkMode));
            store.dispatch(updateFavorites(defaultSettings.favorites));
            store.dispatch(updateSettingsLoaded(true));
            store.dispatch(updateSavedCarts(defaultSettings.saved_carts));
            store.dispatch(updateOrderedItems([]));
            saveSettings();
        }
    });
}

export function saveSettings() {
    const state = store.getState();
    const settings = JSON.stringify(state.settings);
    AsyncStorage.setItem('settings', settings);
}
