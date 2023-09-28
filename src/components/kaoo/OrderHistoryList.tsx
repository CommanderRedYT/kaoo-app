import { RefreshControl, SectionList } from 'react-native';
import { useDispatch, useSelector } from '@src/store';
import type { KaooHistoryItem } from '@src/models/kaoo';
import { useRef, useState } from 'react';
import { ActivityIndicator, Divider, Title } from 'react-native-paper';
import OrderHistorySectionHeader from './OrderHistorySectionHeader';
import OrderHistoryItemList from './OrderHistoryItemList';
import * as api from '@src/utils/api';
import { updateHistory } from '@src/slices/kaoo';
import { Box } from '@react-native-material/core';
import { useScrollToTop } from '@react-navigation/native';

export default function OrderHistoryList() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const history = useSelector(state => state.kaoo.history);
  const table_num = useSelector(state => state.settings.table_num);
  const shopId = useSelector(state => state.kaoo.shopid);
  const ref = useRef(null);

  useScrollToTop(ref);

  const sections = history?.map((historyItem: KaooHistoryItem) => ({
    ...historyItem,
    data: [historyItem],
  }));

  console.log('history length', history?.length);

  const getHistory = async () => {
    if (!table_num) {
      setRefreshing(false);
      return;
    }

    try {
      const data = await api.getOrderHistory(shopId, table_num);
      // console.log(data);

      if (data.length) dispatch(updateHistory(data));
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    getHistory();
  };

  return (
    <>
      {table_num ? (
        <>
          {history ? (
            <SectionList
              ref={ref}
              sections={sections ?? []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <OrderHistoryItemList item={item} />}
              renderSectionHeader={({ section }) => (
                <OrderHistorySectionHeader historyItem={section} />
              )}
              renderSectionFooter={() => <Divider style={{ height: 1 }} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
            />
          ) : (
            <Box
              // box should be at the top, having both children next to each other
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Title>Loading history...</Title>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </Box>
          )}
        </>
      ) : (
        <Box
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title>No table number set</Title>
        </Box>
      )}
    </>
  );
}
