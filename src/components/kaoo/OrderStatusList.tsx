import {SectionList} from "react-native";
import {useSelector} from "../../store";
import {OrderedItem} from "../../models/kaoo";
import {Title} from "react-native-paper";
import {Box} from "@react-native-material/core";
import OrderStatusListItem from "./OrderStatusListItem";

export default function OrderStatusList() {
    const orderedItems = useSelector((state) => state.kaoo.orderedItems);

    const sections = orderedItems.map((orderedItem: OrderedItem) => {
        return {
            ...orderedItem,
            data: [orderedItem],
        }
    });

    return (
        <>
            {orderedItems ? (
                <SectionList
                    sections={sections ?? []}
                    renderItem={
                        ({ item }) => (
                            <OrderStatusListItem
                                orderedItem={item}
                            />
                        )
                    }
                />
            ) : (
                <Box
                    // box should be at the top, having both children next to each other
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Title>
                        Nothing ordered yet!
                    </Title>
                </Box>
            )}
        </>
    );
}
