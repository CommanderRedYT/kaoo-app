import { Button, TextInput, Title } from 'react-native-paper';
import TableNumberScanner from './TableNumberScanner';
import { Box } from '@react-native-material/core';
import { useCallback, useEffect, useState } from 'react';
import * as api from '@src/utils/api';
import { updateGoods, updateShopInfo } from '@src/slices/kaoo';
import { useDispatch, useSelector } from '@src/store';
import { updateOrderedItems, updateTableNum } from '@src/slices/settings';
import { saveSettings } from '@src/utils/settings';

export default function TableSelector() {
  const dispatch = useDispatch();
  const shopId = useSelector(state => state.kaoo.shopid);
  const table_num = useSelector(state => state.settings.table_num);

  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [change_table, setChangeTable] = useState<string>('');

  const getData = useCallback(async () => {
    console.log('Getting data');
    try {
      const shopInfo = await api.getShopInfo(shopId);
      dispatch(updateShopInfo(shopInfo));

      const data = await api.getGoods(shopId);
      dispatch(updateGoods(data));
    } catch (error) {
      console.log(error);
    }
  }, [shopId]);

  useEffect(() => {
    if (!table_num) return;

    setChangeTable(table_num);
  }, [table_num]);

  const handleSaveTableNum = useCallback(() => {
    dispatch(updateOrderedItems([]));
    dispatch(updateTableNum(change_table));
    saveSettings();

    setUseCamera(false);

    getData();
  }, [change_table, dispatch, getData]);

  return (
    <Box style={{ flex: 1, alignSelf: 'stretch', marginTop: 20 }}>
      <Title
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Please select a table
      </Title>
      <TextInput
        label="Table Number"
        value={change_table}
        onChangeText={text => setChangeTable(text)}
        style={{ margin: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleSaveTableNum}
        style={{ margin: 5, borderRadius: 5 }}
      >
        Save Table Number
      </Button>
      {useCamera ? (
        <TableNumberScanner />
      ) : (
        <Button
          mode="contained-tonal"
          onPress={() => setUseCamera(true)}
          style={{ margin: 5, borderRadius: 5 }}
        >
          Scan Table Number
        </Button>
      )}
    </Box>
  );
}
