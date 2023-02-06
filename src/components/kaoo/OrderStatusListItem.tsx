import FastImage from "react-native-fast-image";
import {Checkbox, List} from "react-native-paper";
import {OrderedItem} from "../../models/kaoo";
import {useDispatch, useSelector} from "../../store";
import {toggleOrderItemReceived} from "../../slices/kaoo";

export default function OrderStatusListItem({ orderedItem }: { orderedItem: OrderedItem }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.kaoo.goods);
    const received = useSelector((state) => state.kaoo.orderedItems.find((item) => item.product_id === orderedItem.product_id)?.received ?? false);

    const good = categories
        ?.flatMap((category) => category.det)
        .find((good) => good.product_id === orderedItem.product_id);

    if (!good) {
        return null;
    }

    const toggleReceived = () => {
        dispatch(toggleOrderItemReceived(orderedItem));
    };

    return (
        <List.Item
            title={good.name}
            description={orderedItem.uuid}
            left={() => good.img &&
                <FastImage
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 15,
                        marginLeft: 5
                    }}
                    source={{ uri: good.img }}
                />
            }
            right={() => (
                <Checkbox
                    status={received ? 'checked' : 'unchecked'}
                    onPress={toggleReceived}
                />
            )}
            descriptionStyle={{
                fontSize: 10,
            }}
            titleStyle={{
                fontSize: 20,
            }}
        />
    );
}
