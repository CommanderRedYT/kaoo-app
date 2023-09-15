import 'react-native-get-random-values';
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
import type { SettingsState, SavedCart } from '@src/models/settings';
import { Appearance } from 'react-native';
import type { KaooCart } from '@src/models/kaoo';
import { v4 as uuidv4 } from 'uuid';

const defaultSettings: SettingsState = {
  useDarkMode: Appearance.getColorScheme() === 'dark',
  settingsLoaded: false,
  favorites: [],
  saved_carts: [],
  table_num: null,
  orderedItems: [],
  appOrderHistory: [],
};

const convertSavedCarts = (
  old_saved_carts: KaooCart[] | SavedCart[],
): { result: SavedCart[]; save: boolean } => {
  if (old_saved_carts.length === 0) {
    return { result: [], save: false };
  }

  if (typeof old_saved_carts[0] === 'object' && 'cart' in old_saved_carts[0]) {
    return { result: old_saved_carts as SavedCart[], save: false };
  }

  return {
    result: old_saved_carts.map(cart => ({
      cart: cart as KaooCart,
      uuid: uuidv4(),
    })),
    save: true,
  };
};

export function loadSettings() {
  AsyncStorage.getItem('settings').then(settings => {
    console.log('settings', /*settings,*/ !!settings);
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
      // console.log('favorites', favorites);
      // console.log('appOrderHistory', appOrderHistory);
      store.dispatch(updateFavorites(favorites ?? defaultSettings.favorites));
      store.dispatch(updateSettingsLoaded(true));

      const { result, save } = convertSavedCarts(saved_carts ?? []);
      store.dispatch(updateSavedCarts(result));
      store.dispatch(updateOrderedItems(orderedItems ?? []));
      store.dispatch(updateTableNum(table_num ?? null));
      store.dispatch(updateAppOrderHistory(appOrderHistory ?? []));

      if (save) {
        saveSettings();
      }
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

export function getSettingsJson(prettify = false): string {
  const state = store.getState();
  return JSON.stringify(state.settings, null, prettify ? 2 : 0);
}

export function saveFromJson(settings: string) {
  AsyncStorage.setItem('settings', settings);
}
