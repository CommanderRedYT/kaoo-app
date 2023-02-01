import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import MenuScreen from "../screens/MenuScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {

    return (
        <Stack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
        >
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
        </Stack.Navigator>
    );
}
