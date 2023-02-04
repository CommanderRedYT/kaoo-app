import {KaooHistoryItemDetailsItem} from "../../models/kaoo";
import {IconButton, List, Text, useTheme} from "react-native-paper";
import FastImage from "react-native-fast-image";
import {addGoodToCartByProductIdIfNotExist} from "../../slices/kaoo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useDispatch, useSelector} from "../../store";

export default function OrderHistoryItem({ itemDetails } : { itemDetails: KaooHistoryItemDetailsItem }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isInCart = useSelector(state => Object.keys(state.kaoo.cart).includes(itemDetails.product_id));
    const { goodsname, goodscost, img, goodscount, product_id } = itemDetails;

    const imgUrl = img ? `http://order.huaqiaobang.com/${img}` : undefined;

    return (
        <List.Item
            title={`${goodscount}× ${goodsname}`}
            left={() => imgUrl &&
                <FastImage
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 15,
                        marginLeft: 5
                    }}
                    source={{ uri: imgUrl }}
                />
            }
            right={() => (
                <IconButton
                    icon={() => <FontAwesome5 name="cart-plus" size={15} color={isInCart ? '#3d3d3d' : '#179417'} />}
                    onPress={() => {
                        console.log('add to cart');
                        dispatch(addGoodToCartByProductIdIfNotExist(product_id));
                    }}
                    style={{
                        borderColor: isInCart ? '#3d3d3d' : '#179417',
                        borderWidth: 2
                    }}
                    disabled={isInCart}
                />
            )}

            description={() => (
                <Text style={{fontSize: 15, color: goodscost !== '0.00' ? theme.colors.primary : theme.colors.error, textDecorationStyle: 'solid', textDecorationLine: goodscost !== '0.00' ? 'none' : 'line-through'}}>
                    {goodscost} €
                </Text>
            )}
        />
    );
}
