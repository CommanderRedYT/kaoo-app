import {KaooHistoryItemDetailsItem} from "../../models/kaoo";
import {List, Text, useTheme} from "react-native-paper";
import FastImage from "react-native-fast-image";

export default function OrderHistoryItem({ itemDetails } : { itemDetails: KaooHistoryItemDetailsItem }) {
    const theme = useTheme();
    const { goodsname, goodscost, img } = itemDetails;

    const imgUrl = img ? `http://order.huaqiaobang.com/${img}` : undefined;

    return (
        <List.Item
            title={goodsname}
            left={() => imgUrl &&
                <FastImage
                    style={{ width: 50, height: 50 }}
                    source={{ uri: imgUrl }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            }
            description={() => (
                <Text style={{fontSize: 15, color: goodscost !== '0.00' ? theme.colors.primary : theme.colors.error, textDecorationStyle: 'solid', textDecorationLine: goodscost !== '0.00' ? 'none' : 'line-through'}}>
                    {goodscost} €
                </Text>
            )}
        />
    );
}
