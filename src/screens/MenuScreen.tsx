import {Box} from "@react-native-material/core";
import {StyledView} from "../style";
import {useTheme} from "react-native-paper";
import ItemSearch from "../components/kaoo/ItemSearch";
import GoodsList from "../components/kaoo/GoodsList";
import * as api from "../utils/api";
import {updateGoods} from "../slices/kaoo";
import {useDispatch, useSelector} from "../store";
import {Text} from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import {useEffect} from "react";

export default function MenuScreen({ navigation }) {
    const goods = useSelector((state) => state.kaoo.goods);
    const dispatch = useDispatch();
    const theme = useTheme();

    const getData = () => {
        api.getGoods().then((data) => {
            dispatch(updateGoods(data));
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    console.log("MenuScreen render")

    return (
        <StyledView theme={theme}>
            <Box style={{ flex: 1, alignSelf: 'stretch' }}>
                <ItemSearch />
                {goods?.length ? <GoodsList /> : (
                    <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Loading...</Text>
                        <ActivityIndicator animating={true} color={theme.colors.primary} style={{ marginLeft: 10 }} />
                    </Box>
                )}
            </Box>
        </StyledView>
    );
}
