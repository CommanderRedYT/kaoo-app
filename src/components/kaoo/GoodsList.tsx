import { useSelector } from '@src/store';
import { SectionList } from 'react-native';
import Good from './GoodItem';
import { useTheme, Text } from 'react-native-paper';
import { Box } from '@react-native-material/core';
import { DisplayFilter } from '@src/models/kaoo';
import { useMemo, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';

export default function GoodsList() {
  const theme = useTheme();
  const categories = useSelector(state => state.kaoo.goods);
  const search = useSelector(state => state.kaoo.search);
  const favorites = useSelector(state => state.settings.favorites);
  const filter = useSelector(state => state.kaoo.filter);

  const ref = useRef(null);

  useScrollToTop(ref);

  if (!categories) {
    return null;
  }

  const sections = useMemo(
    () =>
      categories
        ?.map(category => ({
          ...category,
          data: category.det.filter(
            item =>
              (item.name.toLowerCase().includes(search?.toLowerCase() ?? '') ||
                item.product_id.toString().includes(search ?? '')) &&
              (filter === DisplayFilter.ALL ||
                (filter === DisplayFilter.FAVORITE &&
                  favorites?.includes(item.id)) ||
                (filter === DisplayFilter.UNFAVORITE &&
                  !favorites?.includes(item.id))),
          ),
        }))
        .filter(category => category.data.length > 0),
    [categories, search, filter, favorites],
  );

  return (
    <>
      {sections.length === 0 ? (
        <Box
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            No results. Try another search!
          </Text>
        </Box>
      ) : (
        <SectionList
          ref={ref}
          sections={sections}
          keyExtractor={item => `${item.product_id}-${item.id}-${item.name}`}
          renderItem={({ item }) => <Good good={item} />}
          renderSectionHeader={({ section: { name } }) => (
            <Box
              style={{
                backgroundColor: theme.colors.background,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  margin: 1,
                  marginTop: 8,
                }}
              >
                {name}
              </Text>
            </Box>
          )}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
        />
      )}
    </>
  );
}
