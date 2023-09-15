import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@src/store';
import {
  updateSettingsLoaded,
  updateUseDarkMode,
  updateFavorites,
  updateSavedCarts,
  updateTableNum,
  updateOrderedItems,
  updateAppOrderHistory,
} from '@src/slices/settings';
import type { SettingsState } from '@src/models/settings';
import { Appearance } from 'react-native';

const defaultSettings: SettingsState = {
  useDarkMode: Appearance.getColorScheme() === 'dark',
  settingsLoaded: false,
  favorites: [],
  saved_carts: [],
  table_num: null,
  orderedItems: [],
  appOrderHistory: [],
};

export function loadSettings() {
  AsyncStorage.getItem('settings').then(settings => {
    console.log('settings', settings, !!settings);
    if (settings) {
      const {
        useDarkMode,
        favorites,
        saved_carts,
        orderedItems,
        table_num,
        appOrderHistory,
      } = JSON.parse(settings);
      store.dispatch(
        updateUseDarkMode(useDarkMode ?? defaultSettings.useDarkMode),
      );
      console.log('favorites', favorites);
      console.log('appOrderHistory', appOrderHistory);
      store.dispatch(updateFavorites(favorites ?? defaultSettings.favorites));
      store.dispatch(updateSettingsLoaded(true));
      store.dispatch(
        updateSavedCarts(saved_carts ?? defaultSettings.saved_carts),
      );
      store.dispatch(updateOrderedItems(orderedItems ?? []));
      store.dispatch(updateTableNum(table_num ?? null));
      store.dispatch(updateAppOrderHistory(appOrderHistory ?? []));
    } else {
      store.dispatch(updateUseDarkMode(defaultSettings.useDarkMode));
      store.dispatch(updateFavorites(defaultSettings.favorites));
      store.dispatch(updateSettingsLoaded(true));
      store.dispatch(updateSavedCarts(defaultSettings.saved_carts));
      store.dispatch(updateOrderedItems([]));
      store.dispatch(updateTableNum(null));
      store.dispatch(updateAppOrderHistory([]));
      saveSettings();
    }
  });
}

export function saveSettings() {
  const state = store.getState();
  const settings = JSON.stringify(state.settings);
  AsyncStorage.setItem('settings', settings);
}
