// this app should use deep link to open the app when accessing "http://order.huaqiaobang.com/kaoo/#/goods?tablenum=B20" => extract tablenum and set it in the store
import { Linking } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {store, useDispatch, useSelector} from "./store";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "./components/BottomNavigation";
import { ThemeContext as RNMuiThemeContext, darkTheme as RNMuiDarkTheme, defaultTheme as RNMuiDefaultTheme } from "@react-native-material/core";
import { CacheManager } from "@georstat/react-native-image-cache";
import { Dirs } from "react-native-file-access";
import { ReactNavigationDarkTheme, ReactNavigationLightTheme } from "./style";
import {loadSettings} from "./utils/settings";
import {useEffect} from "react";
import {updateTableNum} from "./slices/kaoo";
import URL from "url-parse";
import {getSearchParamFromURL} from "./utils/generic";

CacheManager.config = {
    baseDir: `${Dirs.CacheDir}/images_cache/`,
    blurRadius: 5,
    cacheLimit: 0,
    sourceAnimationDuration: 100,
    thumbnailAnimationDuration: 100,
};

export default function App() {
    return (
        <ReduxProvider store={store}>
            <_App />
        </ReduxProvider>
    );
}

function _App() {
    const dispatch = useDispatch();
    const useDarkTheme = useSelector((state) => state.settings.useDarkMode);
    const settingsLoaded = useSelector((state) => state.settings.settingsLoaded);

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        const func = (url: any) => {
            if (url) {
                const table_num = getSearchParamFromURL(url, 'tablenum');
                console.log(`table_num: ${table_num}`);
                if (table_num) {
                    dispatch(updateTableNum(table_num));
                }
            }
        }

        Linking.getInitialURL().then((url) => func(url));
        Linking.addEventListener('url', (event) => func(event.url));
    }, []);

    if (!settingsLoaded)
        return null;

    return (
        <RNMuiThemeContext.Provider value={useDarkTheme ? RNMuiDarkTheme : RNMuiDefaultTheme}>
            <PaperProvider theme={useDarkTheme ? MD3DarkTheme : MD3LightTheme}>
                <NavigationContainer
                    theme={useDarkTheme ? ReactNavigationDarkTheme : ReactNavigationLightTheme}
                >
                    <BottomNavigation />
                </NavigationContainer>
            </PaperProvider>
        </RNMuiThemeContext.Provider>
    );
}
