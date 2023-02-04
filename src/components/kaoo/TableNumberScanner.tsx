import QRCodeScanner from "react-native-qrcode-scanner";
import {RNCamera} from "react-native-camera";
import {Button, Text} from "react-native-paper";
import {Alert, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";

export default function TableNumberScanner() {
    const [flash, setFlash] = useState(false);

    const onSuccess = (e: any) => {
        Alert.alert(
            'Scan successful!',
            JSON.stringify(e.data),
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };

    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            bottomContent={
                <Button onPress={() => setFlash(!flash)}>Toggle Flash {flash ? 'On' : 'Off'}</Button>
            }
            reactivate
            reactivateTimeout={1000}
        />
    );
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
