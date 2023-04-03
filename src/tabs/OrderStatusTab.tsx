import {StyledView, StyledSafeAreaView} from '../style';
import {Button, Title, useTheme} from 'react-native-paper';
import {Box, Divider} from '@react-native-material/core';
import OrderStatusList from '../components/kaoo/OrderStatusList';
import {useDispatch, useSelector} from '../store';
import {updateOrderedItems, updateTableNum} from '../slices/settings';
import {updateHistory} from '../slices/kaoo';
import {saveSettings} from '../utils/settings';

export default function OrderStatusTab() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const orderedItemsCount = useSelector((state) => state.settings.orderedItems.length);
    const receivedCount = useSelector((state) => state.settings.orderedItems.map((item) => item.received).reduce((a, b) => a + (b ? 1 : 0), 0));

    const orderFinished = () => {
        dispatch(updateTableNum(null));
        dispatch(updateHistory(null));
        dispatch(updateOrderedItems([]));
        saveSettings();
    };

    return (
        <StyledSafeAreaView theme={theme}>
            <StyledView theme={theme}>
                <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                    <Title
                        style={{
                            color: receivedCount === orderedItemsCount ? 'lime' : 'red',
                        }}
                    >
                        Order Status ({receivedCount}/{orderedItemsCount})
                    </Title>
                    <Divider style={{width: '90%', height: 3, marginTop: 10, marginBottom: 10}} />
                    <Box style={{flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <OrderStatusList />
                    </Box>
                    <Box style={{alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                        <Button
                            mode="contained"
                            onPress={orderFinished}
                            disabled={receivedCount !== orderedItemsCount}
                        >
                        Order Finished
                        </Button>
                    </Box>
                </Box>
            </StyledView>
        </StyledSafeAreaView>
    );
}
