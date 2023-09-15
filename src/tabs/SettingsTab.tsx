import { Box } from '@react-native-material/core';
import {
  Divider,
  Text,
  useTheme,
  Switch,
  Title,
  Button,
  TextInput,
} from 'react-native-paper';
import type { AppThunk } from '@src/store';
import { useDispatch, useSelector } from '@src/store';
import { StyledScrollView, StyledSafeAreaView } from '@src/style';
import {
  clearSavedCarts,
  updateFavorites,
  updateOrderedItems,
  updateTableNum,
  updateUseDarkMode,
  updateAppOrderHistory,
} from '@src/slices/settings';
import { saveSettings } from '@src/utils/settings';
import {
  updateAdult,
  updateChild,
  updateHistory,
  updateShopId,
} from '@src/slices/kaoo';
import { FlatList, Linking } from 'react-native';
import { rsplit } from '@src/utils/generic';
import licenses from '@root/licenses.json';
import FastImage from 'react-native-fast-image';
import { useCallback, useMemo } from 'react';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default function SettingsTab() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const useDarkMode = useSelector(state => state.settings.useDarkMode);
  const table_num = useSelector(state => state.settings.table_num);
  const favorites = useSelector(state => state.settings.favorites);
  const shopid = useSelector(state => state.kaoo.shopid);
  const adult = useSelector(state => state.kaoo.adult);
  const child = useSelector(state => state.kaoo.child);
  const shopInfo = useSelector(state => state.kaoo.shopInfo);
  const savedCarts = useSelector(state => state.settings.saved_carts);
  const orderedItems = useSelector(
    state => state.settings.orderedItems.length > 0,
  );
  const appOrderHistory = useSelector(
    state => state.settings.appOrderHistory.length > 0,
  );

  const dispatchWithSave = useCallback(
    (action: AppThunk) => {
      dispatch(action);
      saveSettings();
    },
    [dispatch],
  );

  const clearTableNumber = useCallback(() => {
    dispatch(updateTableNum(null));
    dispatch(updateHistory(null));
    saveSettings();
  }, [dispatch]);

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

  const modifyName = useCallback((name: string) => {
    const parts = rsplit(name, '@', 1);
    return {
      name: parts[0],
      version: parts[1],
    };
  }, []);

  const licenseList = useMemo(() => {
    return Object.keys(licenses).map(key => {
      const { name, version } = modifyName(key);
      return {
        name,
        version,
        license: licenses[key as keyof typeof licenses],
      };
    });
  }, [modifyName]);

  return (
    <StyledSafeAreaView theme={theme}>
      <StyledScrollView theme={theme}>
        <Box mh={10}>
          <Title>Informations</Title>
          {IS_PRODUCTION ? null : (
            <Box mb={5}>
              <TextInput
                label="Shop ID"
                mode="flat"
                value={shopid}
                onChangeText={text => dispatch(updateShopId(text))}
                keyboardType={'numeric'}
              />
            </Box>
          )}
          <Box mb={5}>
            <TextInput
              label="Child count"
              mode="flat"
              value={child.toString()}
              onChangeText={text => dispatch(updateChild(parseInt(text)))}
              keyboardType={'numeric'}
            />
          </Box>
          <Box mb={5}>
            <TextInput
              label="Adult count"
              mode="flat"
              value={adult.toString()}
              onChangeText={text => dispatch(updateAdult(parseInt(text)))}
              keyboardType={'numeric'}
            />
          </Box>
          <Title>Settings</Title>
          <Divider />
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}
          >
            <Text>Use Dark Mode</Text>
            <Switch
              value={useDarkMode}
              onValueChange={() =>
                dispatchWithSave(updateUseDarkMode(!useDarkMode))
              }
            />
          </Box>
          {IS_PRODUCTION ? null : (
            <>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <Text>
                  Clear Table Number {table_num ? `(${table_num})` : null}
                </Text>
                <Button
                  onPress={clearTableNumber}
                  mode="contained"
                  disabled={!table_num}
                >
                  Clear
                </Button>
              </Box>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <Text>
                  Clear Favorites{' '}
                  {favorites.length ? `(${favorites.length})` : null}
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
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <Text>
                  Clear Saved Carts{' '}
                  {savedCarts.length ? `(${savedCarts.length})` : null}
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
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <Text>Clear Order Status</Text>
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
            </>
          )}
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}
          >
            <Text>Clear App Order History</Text>
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
          <Divider />
          <Title>Shop Info</Title>
          <Box>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Shopname: {shopInfo?.shopname}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Address: {shopInfo?.address}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Phone: {shopInfo?.phone}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Email: {shopInfo?.email}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Intervaltime: {shopInfo?.intervaltime}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
            >
              Max: {shopInfo?.max}
            </Text>
            <FastImage
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
              }}
              source={{
                uri: shopInfo?.shoplogo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Box>
          <Divider />
          <Title>Licenses</Title>
          <FlatList
            data={licenseList}
            renderItem={({ item }) => (
              <>
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    textAlign: 'center',
                  }}
                >
                  {item.name} ({item.version}, {item.license.licenses})
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    Linking.openURL(item.license.repository);
                  }}
                  style={{ margin: 10 }}
                  icon="github"
                  contentStyle={{
                    flexDirection: 'row-reverse',
                  }}
                  buttonColor={'#333'}
                  textColor={'#fff'}
                >
                  View on GitHub
                </Button>
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <Divider style={{ margin: 10 }} />}
            scrollEnabled={false}
          />
        </Box>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
