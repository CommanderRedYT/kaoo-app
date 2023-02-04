import {Box, Divider} from "@react-native-material/core";
import {useTheme, Title, Button} from "react-native-paper";
import {StyledView} from "../style";
import CartList from "../components/kaoo/CartList";
import {useSelector} from "../store";

export default function CartTab({ navigation }: { navigation: any }) {
    const theme = useTheme();
    const cart = useSelector((state) => state.kaoo.cart);

    const total = Object.values(cart).reduce((acc, item) => acc + parseInt(item.good.cost) * item.count, 0);
    const count = Object.values(cart).reduce((acc, item) => acc + item.count, 0);

    return (
        <StyledView theme={theme}>
            <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                <Title>Shopping Cart</Title>
                <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                <Box style={{flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginTop: 10}}>
                    <CartList/>
                </Box>
                <Button
                    mode="contained"
                    style={{
                        width: '90%',
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    buttonColor={'#1e8c1e'}
                    textColor={'#ffffff'}
                >
                    Checkout {total}€ ({count} items)
                </Button>
            </Box>
        </StyledView>
    );
}
