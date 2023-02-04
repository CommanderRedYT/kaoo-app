import {Button, Text, TextInput} from "react-native-paper";
import TableNumberScanner from "./TableNumberScanner";
import {Box} from "@react-native-material/core";
import {useEffect, useState} from "react";
import * as api from "../../utils/api";
import {updateGoods, updateShopInfo, updateTableNum} from "../../slices/kaoo";
import {useDispatch, useSelector} from "../../store";

export default function TableSelector() {
    const dispatch = useDispatch();
    const shopId = useSelector((state) => state.kaoo.shopid);
    const table_num = useSelector((state) => state.kaoo.table_num);

    const [useCamera, setUseCamera] = useState<boolean>(false);
    const [change_table, setChangeTable] = useState<string>('');

    const getData = async () => {
        console.log('Getting data');
        try {
            const data = await api.getGoods(shopId);
            dispatch(updateGoods(data));

            const shopInfo = await api.getShopInfo(shopId);
            dispatch(updateShopInfo(shopInfo));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!table_num)
            return;

        setChangeTable(table_num);
    }, [table_num]);

    const handleSaveTableNum = () => {
        dispatch(updateTableNum(change_table));

        setUseCamera(false);

        getData();
    };

    return (
        <Box style={{flex: 1, alignSelf: 'stretch', marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Please select a table</Text>
            <TextInput
                label="Table Number"
                value={change_table}
                onChangeText={(text) => setChangeTable(text)}
                style={{margin: 10}}
            />
            <Button
                mode="contained"
                onPress={handleSaveTableNum}
                style={{margin: 10}}
            >
                Save Table Number
            </Button>
            {useCamera ? (
                <TableNumberScanner />
            ) : (
                <Button
                    mode="contained"
                    onPress={() => setUseCamera(true)}
                    style={{margin: 10}}
                >
                    Scan Table Number
                </Button>
            )}
        </Box>
    );
}
