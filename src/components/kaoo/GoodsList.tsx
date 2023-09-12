import { useSelector } from '@src/store';
import { SectionList } from 'react-native';
import Good from './GoodItem';
import { useTheme, Text } from 'react-native-paper';
import { Box } from '@react-native-material/core';
import { DisplayFilter } from '@src/models/kaoo';

export default function GoodsList() {
    const theme = useTheme();
    const categories = useSelector(state => state.kaoo.goods);
    const search = useSelector(state => state.kaoo.search);
    const favorites = useSelector(state =>
        state.kaoo.filter !== DisplayFilter.ALL
            ? state.settings.favorites
            : null,
    );
    const filter = useSelector(state => state.kaoo.filter);

    if (!categories) {
        return null;
    }

    const sections = categories
        ?.map(category => ({
            ...category,
            data: category.det.filter(
                item =>
                    (item.name
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? '') ||
                        item.product_id.toString().includes(search ?? '')) &&
                    (filter === DisplayFilter.ALL ||
                        (filter === DisplayFilter.FAVORITE &&
                            favorites?.includes(item.id)) ||
                        (filter === DisplayFilter.UNFAVORITE &&
                            !favorites?.includes(item.id))),
            ),
        }))
        .filter(category => category.data.length > 0);

    return (
        <>
            {sections.length === 0 ? (
                <Box
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        No results. Try another search!
                    </Text>
                </Box>
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) =>
                        `${item.product_id}-${index}`
                    }
                    renderItem={({ item }) => <Good good={item} />}
                    renderSectionHeader={({ section: { name } }) => (
                        <Box
                            style={{
                                backgroundColor: theme.colors.background,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    margin: 1,
                                    marginTop: 8,
                                }}>
                                {name}
                            </Text>
                        </Box>
                    )}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                />
            )}
        </>
    );
}
