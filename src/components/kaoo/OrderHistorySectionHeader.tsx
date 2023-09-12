import type { KaooHistoryItem } from '@src/models/kaoo';
import { useTheme, Text } from 'react-native-paper';
import { Box } from '@react-native-material/core';
import moment from 'moment';

export default function OrderHistorySectionHeader({
    historyItem,
}: {
    historyItem: KaooHistoryItem;
}) {
    const theme = useTheme();
    const { dno: order_number, time } = historyItem;

    return (
        <>
            <Box
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    backgroundColor: theme.colors.background,
                }}>
                <Text>Order {order_number}</Text>
                <Text>{moment(time).fromNow()}</Text>
            </Box>
        </>
    );
}
