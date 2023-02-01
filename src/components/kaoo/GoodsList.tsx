import {useSelector} from "../../store";
import {SectionList} from "react-native";
import Good from "./GoodItem";
import {Text} from "react-native-paper";
import {Box} from "@react-native-material/core";

export default function GoodsList() {
    const categories = useSelector((state) => state.kaoo.goods);
    const search = useSelector((state) => state.kaoo.search);

    if (!categories) {
        return null;
    }

    const sections = categories
        ?.map((category) => ({
            ...category,
            data: category.det.filter((item) => item.name.toLowerCase().includes(search?.toLowerCase() ?? '') || item.product_id.toString().includes(search ?? '')),
        }))
        .filter((category) => category.data.length > 0);

    return (
        <>
            {sections.length === 0 && (
                <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No results. Try another search!</Text>
                </Box>
            )}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.product_id}
                renderItem={({ item }) => <Good good={item} />}
                renderSectionHeader={({ section: { name } }) => (
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{name}</Text>
                )}
            />
        </>
    );
}
