import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../screens/MenuScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {

    return (
        <Stack.Navigator
            initialRouteName="MenuScreen"
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
        >
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
        </Stack.Navigator>
    );
}
