import { List, useTheme, IconButton } from 'react-native-paper';
import type { CartItem } from '@src/models/kaoo';
import { Overlay } from 'react-native-elements';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import BigGood from './BigGood';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { addGoodToCart, removeGoodFromCart } from '@src/slices/kaoo';
import { useDispatch } from '@src/store';

export default function CartGood({ cartItem }: { cartItem: CartItem }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const openOverlay = () => {
        setVisible(true);
    };

    const closeOverlay = () => {
        setVisible(false);
    };

    if (!cartItem || !cartItem.good) {
        console.log(cartItem);
        return null;
    }

    const canRemove =
        cartItem && cartItem.good.product_id && cartItem.count > 0;

    return (
        <>
            <List.Item
                title={`${cartItem.count}× ${cartItem.good.name}`}
                left={() =>
                    cartItem.good.img && (
                        <FastImage
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 15,
                                marginLeft: 5,
                            }}
                            source={{ uri: cartItem.good.img }}
                        />
                    )
                }
                right={() => (
                    <>
                        <IconButton
                            icon={() => (
                                <FontAwesome5
                                    name="minus"
                                    size={15}
                                    color={theme.colors.onBackground}
                                />
                            )}
                            onPress={() => {
                                dispatch(removeGoodFromCart(cartItem.good));
                            }}
                            disabled={!canRemove}
                        />
                        <IconButton
                            icon={() => (
                                <FontAwesome5
                                    name="plus"
                                    size={15}
                                    color={theme.colors.onBackground}
                                />
                            )}
                            onPress={() => {
                                dispatch(addGoodToCart(cartItem.good));
                            }}
                        />
                    </>
                )}
                onPress={openOverlay}
            />
            <Overlay
                isVisible={visible}
                onBackdropPress={closeOverlay}
                overlayStyle={{
                    backgroundColor: theme.colors.background,
                    borderRadius: 10,
                    padding: 30,
                    maxWidth: '90%',
                    maxHeight: '90%',
                    minWidth: '50%',
                }}>
                <BigGood good={cartItem.good} />
            </Overlay>
        </>
    );
}
