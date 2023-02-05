import {KaooCart} from "./kaoo";

export interface SettingsState {
    useDarkMode: boolean;
    settingsLoaded: boolean;
    favorites: string[];
    saved_carts: KaooCart[];
}
