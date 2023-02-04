import {KaooHistoryItem} from "../../models/kaoo";
import {Text} from "react-native-paper";
import {Box} from "@react-native-material/core";
import moment from "moment";

export default function OrderHistorySectionHeader({ historyItem } : { historyItem: KaooHistoryItem }) {
    const { dno: order_number, time } = historyItem;

    return (
        <>
            <Box style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
                <Text>Order {order_number}</Text>
                <Text>{moment(time).fromNow()}</Text>
            </Box>
        </>
    );
}
