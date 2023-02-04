import {Box} from "@react-native-material/core";
import ItemSearch from "./ItemSearch";
import {IconButton, useTheme} from "react-native-paper";
import FilterDialog from "./FilterDialog";
import {useState} from "react";
import {useSelector} from "../../store";
import {DisplayFilter} from "../../models/kaoo";

export default function ListTabTopBar() {
    const theme = useTheme();
    const filterSet = useSelector((state) => state.kaoo.filter !== DisplayFilter.ALL);

    const [filterDialogVisible, setFilterDialogVisible] = useState<boolean>(false);

    return (
        <Box style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box style={{flex: 1, alignSelf: 'stretch'}}>
                <ItemSearch />
            </Box>
            <Box style={{flex: 0, alignSelf: 'stretch'}}>
                <IconButton
                    icon={filterSet ? 'filter' : 'filter-outline'}
                    iconColor={theme.colors.primary}
                    size={30}
                    onPress={() => setFilterDialogVisible(true)}
                />
            </Box>
            <FilterDialog filterDialogVisible={filterDialogVisible} setFilterDialogVisible={setFilterDialogVisible} />
        </Box>
    );
}
