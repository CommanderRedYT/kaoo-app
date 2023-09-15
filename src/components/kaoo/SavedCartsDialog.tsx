import {
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from '@src/store';
import { ScrollView } from 'react-native';
import type { KaooCart } from '@src/models/kaoo';
import { updateCart } from '@src/slices/kaoo';
import { Box } from '@react-native-material/core';
import { removeSavedCart } from '@src/slices/settings';
import { Fragment } from 'react';
import FastImage from 'react-native-fast-image';

export default function SavedCartsDialog({
  dialogVisible,
  setDialogVisible,
}: {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const savedCarts = useSelector(state => state.settings.saved_carts);

  const applyCart = (cart: KaooCart) => {
    console.log({ cart });
    dispatch(updateCart(cart));
    setDialogVisible(false);
  };

  const deleteCart = (cart: KaooCart) => {
    dispatch(removeSavedCart(cart));
  };

  return (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Saved Cart</Dialog.Title>
        <ScrollView>
          <Dialog.Content>
            {savedCarts.length ? (
              savedCarts.map((cartObj, index) => (
                <Fragment key={`saved_cart_${cartObj.uuid}`}>
                  {Object.entries(cartObj.cart).map(([key, value]) => (
                    <Fragment key={`fragment_${index}_${key}`}>
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 5,
                        }}
                      >
                        <Text key={`text_${index}_${key}`}>
                          {`${value.count}× ${key}. ${value.good.name}`}
                        </Text>
                        <FastImage
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                          }}
                          source={{
                            uri: value.good.img,
                          }}
                        />
                      </Box>
                    </Fragment>
                  ))}
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                    }}
                  >
                    <Button
                      style={{
                        flex: 1,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      mode="contained"
                      onPress={() => applyCart(cartObj.cart)}
                    >
                      Apply
                    </Button>
                    <Button
                      style={{
                        flex: 1,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      mode="contained"
                      onPress={() => deleteCart(cartObj.cart)}
                      buttonColor={theme.colors.error}
                      textColor={theme.colors.onError}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Divider
                    style={{
                      marginVertical: 10,
                      backgroundColor: theme.colors.onSurface,
                    }}
                  />
                </Fragment>
              ))
            ) : (
              <Text>No saved carts</Text>
            )}
          </Dialog.Content>
        </ScrollView>
      </Dialog>
    </Portal>
  );
}
