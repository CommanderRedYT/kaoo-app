import {KaooCart, OrderedItems} from './kaoo';

export interface SettingsState {
    useDarkMode: boolean;
    settingsLoaded: boolean;
    favorites: string[];
    saved_carts: KaooCart[];
    table_num: string | null;
    orderedItems: OrderedItems;
}
