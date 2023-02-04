import {Box} from "@react-native-material/core";
import {Text} from "react-native-paper";
import {useSelector} from "../../store";

export default function GoodsListSectionHeader({ name }: { name: string }) {
    const goods = useSelector((state) => state.kaoo.goods);
    const filter = useSelector((state) => state.kaoo.filter);
    const isVisible = (
        goods &&
        goods
            .filter((category) => category.name === name)
            .some((category) => category.det.some((item) => filter.includes(item.id)))
    );

    if (!isVisible) {
        return null;
    }

    return (
        <Box style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
        </Box>
    );
}
