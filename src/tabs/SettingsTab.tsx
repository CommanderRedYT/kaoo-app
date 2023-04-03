import {Box} from '@react-native-material/core';
import {Divider, Text, useTheme, Switch, Title, Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from '../store';
import {StyledScrollView, StyledSafeAreaView} from '../style';
import {
    clearSavedCarts,
    updateFavorites,
    updateOrderedItems,
    updateTableNum,
    updateUseDarkMode,
    updateAppOrderHistory,
} from '../slices/settings';
import {saveSettings} from '../utils/settings';
import {updateAdult, updateChild, updateHistory, updateShopId} from '../slices/kaoo';
import {FlatList, Linking} from 'react-native';
import {rsplit} from '../utils/generic';
import licenses from '../../licenses.json';
import FastImage from 'react-native-fast-image';

export default function SettingsTab() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const useDarkMode = useSelector((state) => state.settings.useDarkMode);
    const table_num = useSelector((state) => state.settings.table_num);
    const favorites = useSelector((state) => state.settings.favorites);
    const shopid = useSelector((state) => state.kaoo.shopid);
    const adult = useSelector((state) => state.kaoo.adult);
    const child = useSelector((state) => state.kaoo.child);
    const shopInfo = useSelector((state) => state.kaoo.shopInfo);
    const savedCarts = useSelector((state) => state.settings.saved_carts);
    const orderedItems = useSelector((state) => state.settings.orderedItems.length > 0);
    const appOrderHistory = useSelector((state) => state.settings.appOrderHistory.length > 0);

    const dispatchWithSave = (action: any) => {
        dispatch(action);
        saveSettings();
    };

    const clearTableNumber = () => {
        dispatch(updateTableNum(null));
        dispatch(updateHistory(null));
        saveSettings();
    };

    const clear_saved_carts = () => {
        dispatchWithSave(clearSavedCarts());
    };

    const clear_order_status = () => {
        dispatchWithSave(updateOrderedItems([]));
    };

    const clearFavorites = () => {
        dispatchWithSave(updateFavorites([]));
    };

    const clearAppOrderHistory = () => {
        dispatchWithSave(updateAppOrderHistory([]));
    };

    const modifyName = (name: string) => {
        const parts = rsplit(name, '@', 1);
        return {
            name: parts[0],
            version: parts[1]
        };
    };

    const licenseList = Object.keys(licenses).map((key) => {
        const {name, version} = modifyName(key);
        return {
            name,
            version,
            license: licenses[key as keyof typeof licenses]
        };
    });

    return (
        <StyledSafeAreaView theme={theme}>
            <StyledScrollView theme={theme}>
                <Box style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: 20}}>
                    <Title>
                        Settings
                    </Title>
                    <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Use dark mode
                        </Text>
                        <Switch value={useDarkMode} onValueChange={() => dispatchWithSave(updateUseDarkMode(!useDarkMode))}/>
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Clear Table Number ({table_num})
                        </Text>
                        <Button
                            onPress={clearTableNumber}
                            mode="contained"
                            disabled={!table_num}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Clear Favorites ({favorites.length})
                        </Text>
                        <Button
                            onPress={clearFavorites}
                            mode="contained"
                            disabled={!favorites.length}
                            buttonColor={'#f44336'}
                            textColor={'#fff'}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Clear Saved Carts ({savedCarts.length})
                        </Text>
                        <Button
                            onPress={clear_saved_carts}
                            mode="contained"
                            disabled={!savedCarts.length}
                            buttonColor={'#f44336'}
                            textColor={'#fff'}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Clear Order Status
                        </Text>
                        <Button
                            onPress={clear_order_status}
                            mode="contained"
                            buttonColor={'#f44336'}
                            textColor={'#fff'}
                            disabled={!orderedItems}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Clear App Order History
                        </Text>
                        <Button
                            onPress={clearAppOrderHistory}
                            mode="contained"
                            buttonColor={'#f44336'}
                            textColor={'#fff'}
                            disabled={!appOrderHistory}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                    <Title>
                        Advanced
                    </Title>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Set shop id
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={shopid}
                            onChangeText={(text) => dispatch(updateShopId(text))}
                            keyboardType={'numeric'}
                        />
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Set child count
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={child.toString()}
                            onChangeText={(text) => dispatch(updateChild(parseInt(text)))}
                            keyboardType={'numeric'}
                        />
                    </Box>
                    <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, alignItems: 'center'}}>
                        <Text>
                            Set adult count
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={adult.toString()}
                            onChangeText={(text) => dispatch(updateAdult(parseInt(text)))}
                            keyboardType={'numeric'}
                        />
                    </Box>
                    <Divider style={{width: '90%', height: 2, marginTop: 10, marginBottom: 10}} />
                    <Title>
                        Shop Info
                    </Title>
                    <Box>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Shopname: {shopInfo?.shopname}
                        </Text>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Address: {shopInfo?.address}
                        </Text>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Phone: {shopInfo?.phone}
                        </Text>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Email: {shopInfo?.email}
                        </Text>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Intervaltime: {shopInfo?.intervaltime}
                        </Text>
                        <Text style={{marginLeft: 10, marginRight: 10, textAlign: 'center'}}>
                            Max: {shopInfo?.max}
                        </Text>
                        <FastImage
                            style={{width: 100, height: 100, alignSelf: 'center'}}
                            source={{
                                uri: shopInfo?.shoplogo,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
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
                        scrollEnabled={false}
                    />
                </Box>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}
