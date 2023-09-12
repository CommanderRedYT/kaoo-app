import styled from 'styled-components';
import { View, ScrollView } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ReactNavigationDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#000',
        text: '#fff',
        border: '#ccc',
        notification: '#fff',
    },
};

export const ReactNavigationLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        text: '#000',
        border: '#ccc',
        notification: '#000',
    },
};

export const StyledView = styled(View)`
    //border: 1px solid green;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onBackground};
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    //border: 1px solid blue;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onBackground};
    width: 100%;
`;

export const StyledSafeAreaView = styled(SafeAreaView)`
    //border: 1px solid red;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onBackground};
`;
