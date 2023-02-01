import FastImage from "react-native-fast-image";
import {Text, useTheme} from "react-native-paper";
import {Good} from "../../models/kaoo";

export default function BigGood({ good }: { good: Good }) {
    const theme = useTheme();

    return (
        <>
            <FastImage style={{width: 200, height: 200}} source={{uri: good.img}}/>
            <Text style={{fontSize: 20, color: theme.colors.onBackground}}>{good.name}</Text>
        </>
    );
}
