import {Text, List, useTheme} from "react-native-paper";
import type {Good} from "../../models/kaoo";
import {Overlay} from "react-native-elements";
import {useState} from "react";
import FastImage from "react-native-fast-image";

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
                left={() => good.img &&
                    <FastImage
                        style={{ width: 50, height: 50 }}
                        source={{ uri: good.img }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                }
                onPress={openOverlay}
            />
            <Overlay isVisible={visible} onBackdropPress={closeOverlay} overlayStyle={{ backgroundColor: theme.colors.background, borderRadius: 10 }}>
                <FastImage style={{ width: 200, height: 200 }} source={{ uri: good.img }} />
                <Text style={{ fontSize: 20, color: theme.colors.onBackground }}>{good.name}</Text>
            </Overlay>
        </>
    );
}
