import type { KaooHistoryItem, KaooHistoryItemDetailsItem } from '@src/models/kaoo';
import OrderHistoryItem from './OrderHistoryItem';

export default function OrderHistoryItemList({
    item,
}: {
    item: KaooHistoryItem;
}) {
    const { det } = item;

    return (
        <>
            {det.map((itemDetails: KaooHistoryItemDetailsItem, index) => (
                <OrderHistoryItem itemDetails={itemDetails} key={index} />
            ))}
        </>
    );
}
