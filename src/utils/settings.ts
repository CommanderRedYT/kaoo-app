import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../store";
import {updateSettingsLoaded, updateUseDarkMode, updateFavorites} from "../slices/settings";
import {SettingsState} from "../models/settings";

const defaultSettings: SettingsState = {
    useDarkMode: false,
    settingsLoaded: false,
    favorites: [],
};

export function loadSettings() {
    AsyncStorage.getItem("settings").then((settings) => {
        console.log("settings", settings, !!settings)
        if (settings) {
            const { useDarkMode, favorites } = JSON.parse(settings);
            store.dispatch(updateUseDarkMode(useDarkMode ?? defaultSettings.useDarkMode));
            console.log("favorites", favorites)
            store.dispatch(updateFavorites(favorites ?? defaultSettings.favorites));
            store.dispatch(updateSettingsLoaded(true));
        } else {
            store.dispatch(updateUseDarkMode(defaultSettings.useDarkMode));
            store.dispatch(updateFavorites(defaultSettings.favorites));
            store.dispatch(updateSettingsLoaded(true));
            saveSettings();
        }
    });
}

export function saveSettings() {
    const state = store.getState();
    const settings = JSON.stringify(state.settings);
    AsyncStorage.setItem("settings", settings);
}
