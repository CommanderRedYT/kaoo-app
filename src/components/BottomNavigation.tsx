import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListTab from "../tabs/ListTab";
import {useTheme} from "react-native-paper";
import SettingsTab from "../tabs/SettingsTab";
import CartTab from "../tabs/CartTab";
import {useSelector} from "../store";
import HistoryTab from "../tabs/HistoryTab";

const Tabs = createBottomTabNavigator();

export default function BottomNavigation() {
    const theme = useTheme();
    const cart = useSelector((state) => state.kaoo.cart);

    const count = Object.values(cart).length ? Object.values(cart).reduce((a, b) => a + b.count, 0) : undefined;

    return (
        <Tabs.Navigator
            initialRouteName="ListTab"
            screenOptions={{
                headerShown: false,
                lazy: true,
            }}
        >
            <Tabs.Screen
                name="ListTab"
                component={ListTab}
                options={{
                    tabBarLabel: 'Order',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="restaurant-outline" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
                }}
            />
            <Tabs.Screen
                name="CartTab"
                component={CartTab}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
                    tabBarBadge: count,
                }}
            />
            <Tabs.Screen
                name="HistoryTab"
                component={HistoryTab}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
                }}
            />
            <Tabs.Screen
                name="SettingsTab"
                component={SettingsTab}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
                }}
            />
        </Tabs.Navigator>
    );
}
