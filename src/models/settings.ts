import type { KaooCart, OrderedItems } from './kaoo';

export interface AppOrderHistoryItem {
    orderedItems: OrderedItems;
    totalCost: number;
    date: string;
}

export type AppOrderHistory = AppOrderHistoryItem[];

export interface SettingsState {
    useDarkMode: boolean;
    settingsLoaded: boolean;
    favorites: string[];
    saved_carts: KaooCart[];
    table_num: string | null;
    orderedItems: OrderedItems;
    appOrderHistory: AppOrderHistory;
}
