import { StyledView, StyledSafeAreaView } from '@src/style';
import { Button, Title, useTheme } from 'react-native-paper';
import { Box, Divider } from '@react-native-material/core';
import OrderStatusList from '@src/components/kaoo/OrderStatusList';
import { useDispatch, useSelector } from '@src/store';
import {
  addAppOrderHistory,
  updateOrderedItems,
  updateTableNum,
} from '@src/slices/settings';
import { updateHistory } from '@src/slices/kaoo';
import { saveSettings } from '@src/utils/settings';

export default function OrderStatusTab() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const orderedItemsCount = useSelector(
    state => state.settings.orderedItems.length,
  );
  const receivedCount = useSelector(state =>
    state.settings.orderedItems
      .map(item => item.received)
      .reduce((a, b) => a + (b ? 1 : 0), 0),
  );

  const orderFinished = () => {
    dispatch(addAppOrderHistory());
    dispatch(updateTableNum(null));
    dispatch(updateHistory(null));
    dispatch(updateOrderedItems([]));
    saveSettings();
  };

  return (
    <StyledSafeAreaView theme={theme}>
      <StyledView theme={theme}>
        <Box
          style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Title
            style={{
              color: receivedCount === orderedItemsCount ? 'green' : 'red',
            }}
          >
            Order Status ({receivedCount}/{orderedItemsCount})
          </Title>
          <Divider
            style={{
              width: '90%',
              height: 3,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <Box
            style={{
              flex: 1,
              alignSelf: 'stretch',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <OrderStatusList />
          </Box>
          <Box
            style={{
              alignSelf: 'stretch',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Button
              mode="contained"
              onPress={orderFinished}
              disabled={
                receivedCount !== orderedItemsCount || orderedItemsCount === 0
              }
            >
              Order Finished
            </Button>
          </Box>
        </Box>
      </StyledView>
    </StyledSafeAreaView>
  );
}
