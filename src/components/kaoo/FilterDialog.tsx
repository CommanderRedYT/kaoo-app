import {
  Dialog,
  Portal,
  Text,
  useTheme,
  RadioButton,
} from 'react-native-paper';
import type { DisplayFilterKeys } from '@src/models/kaoo';
import { DisplayFilter } from '@src/models/kaoo';
import { Box } from '@react-native-material/core';
import { updateFilter } from '@src/slices/kaoo';
import { useDispatch, useSelector } from '@src/store';
import { capitalize } from '@src/utils/generic';

export default function FilterDialog({
  filterDialogVisible,
  setFilterDialogVisible,
}: {
  filterDialogVisible: boolean;
  setFilterDialogVisible: (value: boolean) => void;
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const displayFilter = useSelector(state => state.kaoo.filter);

  return (
    <Portal>
      <Dialog
        visible={filterDialogVisible}
        onDismiss={() => setFilterDialogVisible(false)}
      >
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Content>
          {Object.keys(DisplayFilter).map(key => (
            <Box
              key={key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{capitalize(DisplayFilter[key as DisplayFilterKeys])}</Text>
              <RadioButton
                value={DisplayFilter[key as DisplayFilterKeys]}
                status={
                  displayFilter === DisplayFilter[key as DisplayFilterKeys]
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  dispatch(
                    updateFilter(DisplayFilter[key as DisplayFilterKeys]),
                  );
                  setFilterDialogVisible(false);
                }}
                color={theme.colors.primary}
                uncheckedColor={theme.colors.onSurface}
              />
            </Box>
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
