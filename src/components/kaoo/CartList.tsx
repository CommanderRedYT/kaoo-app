import { Box } from '@react-native-material/core';
import { Text, Button, useTheme } from 'react-native-paper';
import { SectionList } from 'react-native';
import { useDispatch, useSelector } from '@src/store';
import type { CartItem } from '@src/models/kaoo';
import CartGood from './CartGoodItem';
import { clearCart } from '@src/slices/kaoo';

export default function CartList() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const cart = useSelector(state => state.kaoo.cart);

    const sections = Object.values(cart).map((cartItem: CartItem) => ({
        ...cartItem,
        data: [cartItem],
    }));

    const deleteAll = () => {
        dispatch(clearCart());
    };

    return (
        <>
            {sections.length === 0 && (
                <Box
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Your cart is empty!
                    </Text>
                </Box>
            )}
            {sections.length > 0 && (
                <Button
                    mode="contained"
                    onPress={deleteAll}
                    buttonColor={theme.colors.errorContainer}
                    textColor={theme.colors.onErrorContainer}>
                    Clear Cart
                </Button>
            )}
            <SectionList
                sections={sections}
                keyExtractor={item => item.good.product_id}
                renderItem={({ item }) => <CartGood cartItem={item} />}
            />
        </>
    );
}
