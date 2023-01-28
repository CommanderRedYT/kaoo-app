import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {store, useSelector} from "./store";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./components/NavigationStack";
import { ThemeContext, darkTheme, defaultTheme } from "@react-native-material/core";

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
        <ThemeContext.Provider value={useDarkTheme ? darkTheme : defaultTheme}>
            <PaperProvider theme={useDarkTheme ? MD3DarkTheme : MD3LightTheme}>
                <NavigationContainer>
                    <NavigationStack />
                </NavigationContainer>
            </PaperProvider>
        </ThemeContext.Provider>
    );
}
