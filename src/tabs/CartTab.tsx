import {View} from "react-native";
import {Box, Divider} from "@react-native-material/core";
import {useTheme, Title} from "react-native-paper";
import {StyledView, StyledSafeAreaView} from "../style";
import CartList from "../components/kaoo/CartList";
import CheckoutButton from "../components/kaoo/CheckoutButton";
import SaveCartButton from "../components/kaoo/SaveCartButton";

export default function CartTab({ navigation }: { navigation: any }) {
    const theme = useTheme();

    return (
        <StyledSafeAreaView theme={theme}>
            <StyledView theme={theme}>
                <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                    <Title>Shopping Cart</Title>
                    <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                    <Box
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10
                        }}
                    >
                        <CartList/>
                    </Box>
                    <Box
                        style={{
                            flexDirection: 'row',
                            width: '95%',
                            justifyContent: 'center',
                        }}
                    >
                        <CheckoutButton />
                        <SaveCartButton />
                    </Box>
                </Box>
            </StyledView>
        </StyledSafeAreaView>
    );
}
