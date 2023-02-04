import GoodsList from "../components/kaoo/GoodsList";
import {Box, Divider} from "@react-native-material/core";
import {ActivityIndicator, Text, useTheme} from "react-native-paper";
import {useDispatch, useSelector} from "../store";
import {StyledView} from "../style";
import ListTabTopBar from "../components/kaoo/ListTabTopBar";
import TableSelector from "../components/kaoo/TableSelector";
import {useEffect} from "react";
import * as api from "../utils/api";
import {updateGoods, updateShopInfo} from "../slices/kaoo";

export default function ListTab({ navigation }: { navigation: any }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const goods = useSelector((state) => state.kaoo.goods);
    const table_num = useSelector((state) => state.kaoo.table_num);
    const shopId = useSelector((state) => state.kaoo.shopid);

    console.log('Rendering ListTab');

    useEffect(() => {
        const func = async () => {
            try {
                const data = await api.getGoods(shopId);
                dispatch(updateGoods(data));

                const shopInfo = await api.getShopInfo(shopId);
                dispatch(updateShopInfo(shopInfo));
            } catch (error) {
                console.log(error);
            }
        };
        func();
    }, [shopId]);

    return (
        <StyledView theme={theme}>
            {table_num ? (
                <Box style={{flex: 1, alignSelf: 'stretch', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <ListTabTopBar />
                    <Divider style={{width: '100%', height: 2, marginTop: 10}} />
                    {goods?.length ? (
                        <GoodsList/>
                    ) : (
                        <Box style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loading...</Text>
                            <ActivityIndicator animating={true} color={theme.colors.primary} style={{marginLeft: 10}}/>
                        </Box>
                    )}
                </Box>
            ) : (
                <TableSelector />
            )}
        </StyledView>
    );
}
