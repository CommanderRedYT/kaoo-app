import {useSelector} from "../../store";
import {SectionList} from "react-native";
import Good from "./GoodItem";
import {Text} from "react-native-paper";
import {Box} from "@react-native-material/core";
import GoodsListSectionHeader from "./GoodsListSectionHeader";
import FastImage from "react-native-fast-image";

export default function GoodsList() {
    const categories = useSelector((state) => state.kaoo.goods);
    const search = useSelector((state) => state.kaoo.search);

    if (!categories) {
        return null;
    }

    let sections = categories
        ?.map((category) => ({
            ...category,
            data:
                category.det
                    .filter(
                        (item) =>
                            (
                                item.name.toLowerCase().includes(search?.toLowerCase() ?? '') ||
                                item.product_id.toString().includes(search ?? '')
                            )
                    )
            ,
        }))
        .filter((category) => category.data.length > 0);

    return (
        <>
            {sections.length === 0 ? (
                <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No results. Try another search!</Text>
                    {
                        search && search.toLowerCase() === 'oida' && (
                            <>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Oida!</Text>
                                <FastImage
                                    style={{ width: 400, height: 300 }}
                                    source={{
                                        uri: 'https://commanderred.xyz/assets/oida.png',
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </>
                        )
                    }
                </Box>
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.product_id}
                    renderItem={({ item }) => <Good good={item} />}
                    renderSectionHeader={({ section: { name } }) => (
                        <GoodsListSectionHeader name={name} />
                    )}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                />
            )}
        </>
    );
}
