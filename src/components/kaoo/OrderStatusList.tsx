import { SectionList } from 'react-native';
import { useSelector } from '@src/store';
import type { OrderedItem } from '@src/models/kaoo';
import { Title } from 'react-native-paper';
import { Box } from '@react-native-material/core';
import OrderStatusListItem from './OrderStatusListItem';
import { useScrollToTop } from '@react-navigation/native';
import { useRef } from 'react';

export default function OrderStatusList() {
  const orderedItems = useSelector(state => state.settings.orderedItems);

  const ref = useRef(null);

  useScrollToTop(ref);

  const sections = orderedItems.map((orderedItem: OrderedItem) => {
    return {
      ...orderedItem,
      data: [orderedItem],
    };
  });

  return (
    <>
      {orderedItems.length > 0 ? (
        <SectionList
          ref={ref}
          sections={sections ?? []}
          renderItem={({ item }) => <OrderStatusListItem orderedItem={item} />}
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
          <Title>Nothing ordered yet!</Title>
        </Box>
      )}
    </>
  );
}
