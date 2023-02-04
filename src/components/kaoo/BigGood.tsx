import FastImage from "react-native-fast-image";
import {Text, Divider, useTheme, IconButton, MD2Colors} from "react-native-paper";
import {Good} from "../../models/kaoo";
import {Box} from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from "../../store";
import {addGoodToCart, removeGoodFromCart} from "../../slices/kaoo";

export default function BigGood({ good }: { good: Good }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const cart = useSelector((state) => state.kaoo.cart);

    const hasPrice = good.cost !== '0.00';

    const canRemove = cart && cart[good.product_id] && cart[good.product_id].count > 0;

    // can add if key does not exist or is less than 10
    const canAdd = true; //cart && (cart[good.product_id] === undefined || cart[good.product_id] < 10);

    const count = cart && cart[good.product_id] ? cart[good.product_id].count : 0;

    return (
        <>
            <Box
                style={{
                    flexShrink: 1,
                    alignItems: 'center'
                }}
            >
                <FastImage
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 25,
                    }}
                    source={{
                        uri: good.img
                    }}
                />
                <Text style={{fontSize: 20, color: theme.colors.onBackground}}>{good.name}</Text>
            </Box>
            <Box
                style={{
                    marginBottom: 10,
                }}
            >
                <Divider />
                <Text style={{fontSize: 15, color: hasPrice ? theme.colors.primary : theme.colors.error, textDecorationStyle: 'solid', textDecorationLine: hasPrice ? 'none' : 'line-through'}}>
                    {good.cost} €
                </Text>
            </Box>
            <Box
                style={{
                    flexShrink: 1,
                    alignItems: 'center'
                }}
            >
                <Box
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                >
                    <IconButton
                        icon={() => <FontAwesome5 name="minus" size={20} />}
                        onPress={() => {
                            dispatch(removeGoodFromCart(good));
                        }}
                        disabled={!canRemove}
                        mode={'contained'}
                        size={20}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            color: theme.colors.onBackground,
                            marginHorizontal: 10,
                        }}
                    >
                        {count}
                    </Text>
                    <IconButton
                        icon={() => <FontAwesome5 name="plus" size={20} />}
                        onPress={() => {
                            dispatch(addGoodToCart(good));
                        }}
                        disabled={!canAdd}
                        mode={'contained-tonal'}
                        size={20}
                    />
                </Box>
            </Box>
        </>
    );
}
