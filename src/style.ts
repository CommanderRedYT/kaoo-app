import styled from "styled-components";
import { View, ScrollView } from "react-native";
import {DefaultTheme, DarkTheme} from "@react-navigation/native";

export const ReactNavigationDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#000",
        text: "#fff",
        border: "#ccc",
        notification: "#fff",
    },
};

export const ReactNavigationLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#fff",
        text: "#000",
        border: "#ccc",
        notification: "#000",
    },
};

export const StyledView = styled(View)`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.onBackground};
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.onBackground};
`;
