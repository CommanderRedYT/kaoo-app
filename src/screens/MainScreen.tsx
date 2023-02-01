import {Button, Text} from "@react-native-material/core";
import {StyledView} from "../style";
import {useTheme} from "react-native-paper";
import * as api from "../utils/api";
import {useDispatch} from "../store";
import {updateGoods} from "../slices/kaoo";

export default function MainScreen({ navigation }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const getData = () => {
        api.getGoods().then((data) => {
            dispatch(updateGoods(data));
            navigation.navigate("MenuScreen");
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <StyledView theme={theme}>
            <Text>Test</Text>
            <Button title="Get data" onPress={getData} />
        </StyledView>
    );
}
