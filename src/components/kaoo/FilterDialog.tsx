import {Dialog, Checkbox, Portal, Text, useTheme} from 'react-native-paper';
import {DisplayFilter, DisplayFilterKeys} from '../../models/kaoo';
import {Box} from '@react-native-material/core';
import {updateFilter} from '../../slices/kaoo';
import {useDispatch, useSelector} from '../../store';
import {capitalize} from '../../utils/generic';

export default function FilterDialog({ filterDialogVisible, setFilterDialogVisible }: { filterDialogVisible: boolean, setFilterDialogVisible: (value: boolean) => void }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const displayFilter = useSelector((state) => state.kaoo.filter);

    return (
        <Portal>
            <Dialog
                visible={filterDialogVisible}
                onDismiss={() => setFilterDialogVisible(false)}
            >
                <Dialog.Title>Filter</Dialog.Title>
                <Dialog.Content>
                    {Object.keys(DisplayFilter).map((key) => (
                        <Box key={key} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text>{capitalize(DisplayFilter[key as DisplayFilterKeys])}</Text>
                            <Checkbox
                                status={displayFilter === DisplayFilter[key as DisplayFilterKeys] ? 'checked' : 'unchecked'}
                                onPress={() =>
                                    dispatch(updateFilter(DisplayFilter[key as DisplayFilterKeys]))
                                }
                                color={theme.colors.primary}
                                uncheckedColor={theme.colors.onSurface}
                            />
                        </Box>
                    ))}
                    <Text style={{marginTop: 10}}>
                        Hi! This filter will lag. It's a known issue. If you can help, please make a pull request!
                    </Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}
