import {Text} from "@react-native-material/core";
import {StyledView} from "../style";
import {useTheme} from "react-native-paper";

export default function MainScreen({ navigation }) {
    const theme = useTheme();

    return (
        <StyledView theme={theme}>
            <Text>Test</Text>
        </StyledView>
    );
}
