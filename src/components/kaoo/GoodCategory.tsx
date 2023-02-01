import {Text, Title, List} from "react-native-paper";
import type {GoodCategory} from "../../models/kaoo";
import Good from "./Good";
import {useSelector} from "../../store";

export default function GoodCategory({ category }: { category: GoodCategory }) {
    const search = useSelector((state) => state.kaoo.search);

    const items = category.det.filter((item) => search ? item.name.toLowerCase().includes(search.toLowerCase()) : true);

    if (!items.length) {
        return null;
    }

    return (
        <>
            <Title>
                {category.name}
            </Title>
            <List.Section>
                {items.map((good) => (
                    <Good key={good.id} good={good} />
                ))}
            </List.Section>
        </>
    );
}
