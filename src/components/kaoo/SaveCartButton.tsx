import {Button, useTheme} from "react-native-paper";
import {useDispatch, useSelector} from "../../store";
import {addIfNotExistsSavedCart} from "../../slices/settings";

export default function SaveCartButton() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.kaoo.cart);
    const cartEmpty = Object.values(cart).length === 0;

    const handleSaveCart = () => {
        if (!cart || cartEmpty)
            return;

        dispatch(addIfNotExistsSavedCart(cart));
    };

    return (
        <Button
            mode="contained"
            style={{
                width: '35%',
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            }}
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
            onPress={handleSaveCart}
            disabled={cartEmpty}
        >
            Save Cart
        </Button>
    );
}
