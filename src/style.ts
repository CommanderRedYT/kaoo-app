import styled from "styled-components";
import { MD3DarkTheme } from "react-native-paper";
import { View } from "react-native";

export const StyledView = styled(View)`
  background-color: ${MD3DarkTheme.colors.background};
  color: ${MD3DarkTheme.colors.onBackground};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
