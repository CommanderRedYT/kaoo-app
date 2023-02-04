import {Box} from "@react-native-material/core";
import {Divider, Text, useTheme, Switch, Title, Button} from "react-native-paper";
import {useDispatch, useSelector} from "../store";
import {StyledView} from "../style";
import {updateFavorites, updateUseDarkMode} from "../slices/settings";
import {saveSettings} from "../utils/settings";
import {updateHistory, updateTableNum} from "../slices/kaoo";
import {FlatList, Linking} from "react-native";
import {rsplit} from "../utils/generic";
import licenses from "../../licenses.json";

export default function SettingsTab({ navigation }: { navigation: any }) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const useDarkMode = useSelector((state) => state.settings.useDarkMode);
    const table_num = useSelector((state) => state.kaoo.table_num);
    const favorites = useSelector((state) => state.settings.favorites);

    const dispatchWithSave = (action: any) => {
        dispatch(action);
        saveSettings();
    };

    const clearTableNumber = () => {
        dispatch(updateTableNum(null));
        dispatch(updateHistory(null));
    };

    const clearFavorites = () => {
        dispatchWithSave(updateFavorites([]));
    };

    const modifyName = (name: string) => {
        const parts = rsplit(name, '@', 1);
        return {
            name: parts[0],
            version: parts[1]
        }
    };

    const licenseList = Object.keys(licenses).map((key) => {
        const {name, version} = modifyName(key);
        return {
            name,
            version,
            license: licenses[key as keyof typeof licenses]
        }
    });

    return (
        <StyledView theme={theme}>
            <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                <Title>Settings</Title>
                <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                    <Text>Use dark mode</Text>
                    <Switch value={useDarkMode} onValueChange={() => dispatchWithSave(updateUseDarkMode(!useDarkMode))}/>
                </Box>
                <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                    <Text>Clear Table Number</Text>
                    <Button
                        onPress={clearTableNumber}
                        mode="contained"
                        disabled={!table_num}
                    >
                        Clear
                    </Button>
                </Box>
                <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                    <Text>Clear Favorites</Text>
                    <Button
                        onPress={clearFavorites}
                        mode="contained"
                        disabled={!favorites.length}
                    >
                        Clear
                    </Button>
                </Box>
                <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                <Title>Licenses</Title>
                <FlatList
                    data={licenseList}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                                {item.name} ({item.version}, {item.license.licenses})
                            </Text>
                            <Button
                                mode="contained"
                                onPress={() => {
                                    Linking.openURL(item.license.repository);
                                }}
                                style={{margin: 10}}
                                icon="github"
                                contentStyle={{flexDirection: 'row-reverse'}}
                                buttonColor={'#333'}
                                textColor={'#fff'}
                            >
                                View on GitHub
                            </Button>
                        </>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <Divider style={{margin: 10}}/>}
                />
            </Box>
        </StyledView>
    );
}
