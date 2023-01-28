import styled from "styled-components";
import { View } from "react-native";

export const StyledView = styled(View)`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.onBackground};
    flex: 1;
    align-items: center;
    justify-content: center;
`;
