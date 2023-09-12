import { List, Text, useTheme } from 'react-native-paper';
import type { Good } from '@src/models/kaoo';
import { Overlay } from 'react-native-elements';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import BigGood from './BigGood';
import FavoriteButton from './FavoriteButton';

export default function Good({ good }: { good: Good }) {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);

    const openOverlay = () => {
        setVisible(true);
    };

    const closeOverlay = () => {
        setVisible(false);
    };

    return (
        <>
            <List.Item
                title={`${good.product_id}. ${good.name}`}
                left={() =>
                    good.img && (
                        <FastImage
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 15,
                                marginLeft: 5,
                            }}
                            source={{
                                uri: good.img,
                            }}
                        />
                    )
                }
                description={() => (
                    <Text
                        style={{
                            fontSize: 15,
                            color:
                                good.cost !== '0.00'
                                    ? theme.colors.primary
                                    : theme.colors.error,
                            textDecorationStyle: 'solid',
                            textDecorationLine:
                                good.cost !== '0.00' ? 'none' : 'line-through',
                        }}>
                        {good.cost} €
                    </Text>
                )}
                right={() => <FavoriteButton good={good} />}
                onPress={openOverlay}
            />
            <Overlay
                isVisible={visible}
                onBackdropPress={closeOverlay}
                overlayStyle={{
                    backgroundColor: theme.colors.background,
                    borderRadius: 10,
                    padding: 30,
                    maxWidth: '90%',
                    maxHeight: '90%',
                    minWidth: '50%',
                }}>
                <BigGood good={good} />
            </Overlay>
        </>
    );
}
