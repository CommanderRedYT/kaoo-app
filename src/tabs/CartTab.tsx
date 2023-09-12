import { Box, Divider } from '@react-native-material/core';
import { useTheme, Title, IconButton } from 'react-native-paper';
import { StyledView, StyledSafeAreaView } from '@src/style';
import CartList from '@src/components/kaoo/CartList';
import CartButtons from '@src/components/kaoo/CartButtons';
import SavedCartsDialog from '@src/components/kaoo/SavedCartsDialog';
import { useState } from 'react';

export default function CartTab() {
    const theme = useTheme();

    const [savedCartsDialogVisible, setSavedCartsDialogVisible] =
        useState<boolean>(false);

    return (
        <>
            <StyledSafeAreaView theme={theme}>
                <StyledView theme={theme}>
                    <Box
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <Box
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                maxHeight: 50,
                            }}>
                            <Box>
                                <Title>Shopping Cart</Title>
                            </Box>
                            <Box>
                                {/* popup for saved carts */}
                                <IconButton
                                    icon="eye"
                                    size={20}
                                    onPress={() =>
                                        setSavedCartsDialogVisible(true)
                                    }
                                />
                            </Box>
                        </Box>
                        <Divider
                            style={{
                                width: '90%',
                                height: 2,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        <Box
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                            }}>
                            <CartList />
                        </Box>
                        <CartButtons />
                    </Box>
                </StyledView>
            </StyledSafeAreaView>
            <SavedCartsDialog
                dialogVisible={savedCartsDialogVisible}
                setDialogVisible={setSavedCartsDialogVisible}
            />
        </>
    );
}
