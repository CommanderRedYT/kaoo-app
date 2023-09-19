import { SegmentedButtons, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from '@src/store';
import {
  addIfNotExistsSavedCart,
  addOrderToOrderList,
} from '@src/slices/settings';
import { generateOrder } from '@src/utils/kaoo';
import { makeOrder } from '@src/utils/api';
import { clearCart, updateInProgress } from '@src/slices/kaoo';
import { Alert } from 'react-native';
import { saveSettings } from '@src/utils/settings';
import noop from '@src/utils/noop';

export default function CartButtons() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.kaoo.cart);
  const adult = useSelector(state => state.kaoo.adult);
  const child = useSelector(state => state.kaoo.child);
  const table_num = useSelector(state => state.settings.table_num);
  const shopid = useSelector(state => state.kaoo.shopid);
  const cartEmpty = Object.values(cart).length === 0;
  const inProgress = useSelector(state => state.kaoo.inProgress);

  const handleSaveCart = () => {
    if (!cart || cartEmpty) return;

    dispatch(addIfNotExistsSavedCart(cart));
    console.log('saved cart', JSON.stringify(cart));
    saveSettings();
  };

  const handleCheckout = async () => {
    if (!table_num) {
      return;
    }

    dispatch(updateInProgress(true));

    const order = generateOrder(cart, adult, child, table_num, shopid);
    const result = await makeOrder(order);
    console.log('order result', result);
    dispatch(clearCart());

    if (result) {
      Alert.alert('Order placed', result.msg);
      dispatch(addOrderToOrderList(cart));
      saveSettings();
    } else {
      Alert.alert('Order failed', 'Please try again later');
    }

    dispatch(updateInProgress(false));
  };

  const total = Object.values(cart).reduce(
    (acc, item) => acc + parseFloat(item.good.cost) * item.count,
    0,
  );
  const count = Object.values(cart).reduce((acc, item) => acc + item.count, 0);

  return (
    <SegmentedButtons
      value={'value'}
      onValueChange={noop}
      buttons={[
        {
          value: 'save',
          label: 'Save Cart',
          icon: 'content-save-all',
          onPress: handleSaveCart,
          style: {
            backgroundColor: theme.colors.secondaryContainer,
          },
          disabled: cartEmpty,
        },
        {
          value: 'checkout',
          label:
            count !== 0
              ? `Checkout ${total}€ (${count} ${count > 1 ? 'items' : 'item'})`
              : 'Cart is empty',
          icon: 'cart',
          onPress: handleCheckout,
          style: {
            backgroundColor: '#1e8c1e',
          },
          disabled: cartEmpty || inProgress,
        },
      ]}
      style={{
        marginVertical: 10,
        marginHorizontal: 5,
      }}
    />
  );
}
