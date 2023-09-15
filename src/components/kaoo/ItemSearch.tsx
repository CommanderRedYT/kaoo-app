import { Searchbar } from 'react-native-paper';
import { updateSearch } from '@src/slices/kaoo';
import { useDispatch, useSelector } from '@src/store';

export default function ItemSearch() {
  const dispatch = useDispatch();
  const search = useSelector(state => state.kaoo.search);

  const onChangeSearch = (query: string) => {
    dispatch(updateSearch(query));
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={search ?? ''}
      style={{ borderRadius: 100 }}
    />
  );
}
