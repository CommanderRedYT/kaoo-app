import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {store, useSelector} from "./store";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./components/NavigationStack";
import { ThemeContext as RNMuiThemeContext, darkTheme as RNMuiDarkTheme, defaultTheme as RNMuiDefaultTheme } from "@react-native-material/core";
import { CacheManager } from "@georstat/react-native-image-cache";
import { Dirs } from "react-native-file-access";

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
    const useDarkTheme = useSelector((state) => state.settings.useDarkMode);

    return (
        <RNMuiThemeContext.Provider value={useDarkTheme ? RNMuiDarkTheme : RNMuiDefaultTheme}>
            <PaperProvider theme={useDarkTheme ? MD3DarkTheme : MD3LightTheme}>
                <NavigationContainer>
                    <NavigationStack />
                </NavigationContainer>
            </PaperProvider>
        </RNMuiThemeContext.Provider>
    );
}
