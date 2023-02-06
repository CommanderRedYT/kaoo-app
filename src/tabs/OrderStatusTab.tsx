import {StyledView, StyledSafeAreaView} from "../style";
import {Title, useTheme} from "react-native-paper";
import {Box, Divider} from "@react-native-material/core";
import OrderStatusList from "../components/kaoo/OrderStatusList";
import {useSelector} from "../store";

export default function OrderStatusTab({ navigation }: { navigation: any }) {
    const theme = useTheme();
    const orderedItemsCount = useSelector((state) => state.kaoo.orderedItems.length);
    const receivedCount = useSelector((state) => state.kaoo.orderedItems.map((item) => item.received).reduce((a, b) => a + (b ? 1 : 0), 0));

    return (
        <StyledSafeAreaView theme={theme}>
            <StyledView theme={theme}>
                <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                    <Title
                        style={{
                            color: receivedCount === orderedItemsCount ? 'lime' : 'red',
                        }}
                    >
                        Order Status ({receivedCount}/{orderedItemsCount})
                    </Title>
                    <Divider style={{width: '90%', height: 3, marginTop: 10, marginBottom: 10}} />
                    <Box style={{flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <OrderStatusList />
                    </Box>
                </Box>
            </StyledView>
        </StyledSafeAreaView>
    );
}
