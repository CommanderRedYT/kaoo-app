import {View} from "react-native";
import {StyledView, StyledSafeAreaView} from "../style";
import {useEffect} from "react";
import {Title, useTheme} from "react-native-paper";
import * as api from "../utils/api";
import {Box, Divider} from "@react-native-material/core";
import OrderHistoryList from "../components/kaoo/OrderHistoryList";
import {useDispatch, useSelector} from "../store";
import {updateHistory} from "../slices/kaoo";

export default function HistoryTab({ navigation }: { navigation: any }) {
    const dispatch = useDispatch();
    const table_num = useSelector((state) => state.kaoo.table_num);
    const shopId = useSelector((state) => state.kaoo.shopid);
    const theme = useTheme();

    useEffect(() => {
        const func = async () => {
            if (!table_num)
                return;

            try {
                const data = await api.getOrderHistory(shopId, table_num);
                // console.log(data);

                if (data.length)
                    dispatch(updateHistory(data));
            } catch (error) {
                console.log(error);
            }
        };

        const interval = setInterval(func, 30000);
        func();
        return () => clearInterval(interval);
    }, [table_num]);

    return (
        <StyledSafeAreaView theme={theme}>
            <StyledView theme={theme}>
                <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                    <Title>Order History {table_num}</Title>
                    <Divider style={{width: '90%', height: 3, marginTop: 10, marginBottom: 10}} />
                    <Box style={{flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <OrderHistoryList />
                    </Box>
                </Box>
            </StyledView>
        </StyledSafeAreaView>
    );
}
