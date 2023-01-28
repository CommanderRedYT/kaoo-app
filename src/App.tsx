import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider, MD3DarkTheme } from "react-native-paper";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./components/NavigationStack";
import { ThemeContext, darkTheme } from "@react-native-material/core";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <ThemeContext.Provider value={darkTheme}>
                <PaperProvider theme={MD3DarkTheme}>
                    <NavigationContainer>
                        <NavigationStack />
                    </NavigationContainer>
                </PaperProvider>
            </ThemeContext.Provider>
        </ReduxProvider>
    );
}
