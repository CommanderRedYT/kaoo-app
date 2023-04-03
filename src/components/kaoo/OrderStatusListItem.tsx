import FastImage from 'react-native-fast-image';
import {Checkbox, List, useTheme} from 'react-native-paper';
import {OrderedItem} from '../../models/kaoo';
import {useDispatch, useSelector} from '../../store';
import {toggleOrderItemReceived} from '../../slices/settings';
import {saveSettings} from '../../utils/settings';

export default function OrderStatusListItem({ orderedItem }: { orderedItem: OrderedItem }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.kaoo.goods);
    const received = useSelector((state) => state.settings.orderedItems.find((item) => item.uuid === orderedItem.uuid)?.received ?? false);

    const good = categories
        ?.flatMap((category) => category.det)
        .find((good) => good.product_id === orderedItem.product_id);

    if (!good) {
        return null;
    }

    const toggleReceived = () => {
        dispatch(toggleOrderItemReceived(orderedItem));
        saveSettings();
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
                        marginLeft: 5,
                        opacity: received ? 0.2 : 1,
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
                opacity: received ? 0.2 : 1,
            }}
            titleStyle={{
                fontSize: 20,
                opacity: received ? 0.2 : 1,
            }}
            onPress={toggleReceived}
        />
    );
}
