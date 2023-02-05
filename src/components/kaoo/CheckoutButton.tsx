import {Button} from "react-native-paper";
import {generateOrder} from "../../utils/kaoo";
import {makeOrder} from "../../utils/api";
import {clearCart} from "../../slices/kaoo";
import {Alert} from "react-native";
import {useDispatch, useSelector} from "../../store";

export default function CheckoutButton() {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.kaoo.cart);
    const adult = useSelector((state) => state.kaoo.adult);
    const child = useSelector((state) => state.kaoo.child);
    const table_num = useSelector((state) => state.kaoo.table_num);
    const shopid = useSelector((state) => state.kaoo.shopid);

    const total = Object.values(cart).reduce((acc, item) => acc + parseInt(item.good.cost) * item.count, 0);
    const count = Object.values(cart).reduce((acc, item) => acc + item.count, 0);

    const handleCheckout = async () => {
        if (!table_num) {
            return;
        }

        const order = generateOrder(cart, adult, child, table_num, shopid);
        const result = await makeOrder(order);
        console.log('order result', result);
        dispatch(clearCart());

        if (result) {
            Alert.alert('Order placed', result.msg);
        } else {
            Alert.alert('Order failed', 'Please try again later');
        }
    };

    return (
        <Button
            mode="contained"
            style={{
                width: '65%',
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }}
            buttonColor={'#1e8c1e'}
            textColor={'#ffffff'}
            onPress={handleCheckout}
            disabled={count === 0}
        >
            {count !== 0 ? (
                <>
                    Checkout {total}€ ({count} {count > 1 ? 'items' : 'item'})
                </>
            ) : (
                <>
                    Cart is empty
                </>
            )}
        </Button>
    );
}
