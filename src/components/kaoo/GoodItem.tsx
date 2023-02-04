import {IconButton, List, Text, useTheme} from "react-native-paper";
import type {Good} from "../../models/kaoo";
import {DisplayFilter} from "../../models/kaoo";
import {Overlay} from "react-native-elements";
import {useState} from "react";
import FastImage from "react-native-fast-image";
import BigGood from "./BigGood";
import {useDispatch, useSelector} from "../../store";
import {addFavorite, removeFavorite} from "../../slices/settings";
import {saveSettings} from "../../utils/settings";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Good({ good }: { good: Good }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const isFavorite = useSelector((state) => state.settings.favorites.includes(good.id));
    const filter = useSelector((state) => state.kaoo.filter);

    if (filter !== DisplayFilter.ALL) {
        if (filter === DisplayFilter.FAVORITE && !isFavorite) {
            return null;
        }
        if (filter === DisplayFilter.UNFAVORITE && isFavorite) {
            return null;
        }
    }

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(good.id));
        } else {
            dispatch(addFavorite(good.id));
        }
        saveSettings();
    };

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
                left={() => good.img &&
                    <FastImage
                        style={{ width: 50, height: 50 }}
                        source={{ uri: good.img }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                }
                description={() => (
                    <Text style={{fontSize: 15, color: good.cost !== '0.00' ? theme.colors.primary : theme.colors.error, textDecorationStyle: 'solid', textDecorationLine: good.cost !== '0.00' ? 'none' : 'line-through'}}>
                        {good.cost} €
                    </Text>
                )}
                right={() => (
                    <IconButton
                        icon={() =>
                            <FontAwesome
                                name={isFavorite ? 'heart' : 'heart-o'}
                                size={20}
                                color={
                                    filter === DisplayFilter.ALL ?
                                        (isFavorite ? '#ec3939' : 'rgba(94,94,94,1)') :
                                        (isFavorite ? 'rgba(236,57,57,0.3)' : 'rgba(94,94,94,0.3)')
                                }
                                disabled={filter !== DisplayFilter.ALL}
                            />
                        }
                        onPress={toggleFavorite}
                        disabled={filter !== DisplayFilter.ALL}
                    />
                )}
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
                    minWidth: '50%'
                }}
            >
                <BigGood good={good} />
            </Overlay>
        </>
    );
}
