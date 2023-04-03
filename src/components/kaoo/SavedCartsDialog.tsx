import {Button, Dialog, Divider, Portal, Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from '../../store';
import {ScrollView} from 'react-native';
import {KaooCart} from '../../models/kaoo';
import {updateCart} from '../../slices/kaoo';
import {Box} from '@react-native-material/core';
import {removeSavedCart} from '../../slices/settings';

export default function SavedCartsDialog({ dialogVisible, setDialogVisible }: { dialogVisible: boolean, setDialogVisible: (value: boolean) => void }) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const savedCarts = useSelector((state) => state.settings.saved_carts);

    const applyCart = (cart: KaooCart) => {
        console.log({cart});
        dispatch(updateCart(cart));
        setDialogVisible(false);
    };

    const deleteCart = (cart: KaooCart) => {
        dispatch(removeSavedCart(cart));
    };

    return (
        <Portal>
            <Dialog
                visible={dialogVisible}
                onDismiss={() => setDialogVisible(false)}
            >
                <Dialog.Title>Saved Cart</Dialog.Title>
                <ScrollView>
                    <Dialog.Content>
                        {savedCarts.map((cart, index) => (
                            <>
                                {Object.entries(cart).map(([key, value]) => (
                                    <Text key={key}>{`${value.count}× ${key}. ${value.good.name}`}</Text>
                                ))}
                                <Box key={index}>
                                    <Button
                                        mode="contained"
                                        onPress={() => applyCart(cart)}
                                        style={{ marginVertical: 10 }}
                                    >
                                    Apply
                                    </Button>
                                    <Button
                                        mode="contained"
                                        onPress={() => deleteCart(cart)}
                                        style={{ marginVertical: 10 }}
                                        buttonColor={theme.colors.error}
                                        textColor={theme.colors.onError}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                <Divider style={{ marginVertical: 10, backgroundColor: theme.colors.onSurface }} />
                            </>
                        ))}
                    </Dialog.Content>
                </ScrollView>
            </Dialog>
        </Portal>
    );
}
