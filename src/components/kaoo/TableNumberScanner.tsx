import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import {getSearchParamFromURL} from '../../utils/generic';
import {updateTableNum} from '../../slices/settings';
import {useDispatch} from '../../store';
import {saveSettings} from '../../utils/settings';

export default function TableNumberScanner() {
    const dispatch = useDispatch();
    const [flash, setFlash] = useState(false);

    const onSuccess = (e: any) => {
        const url = e.data;
        const table_num = getSearchParamFromURL(url, 'tablenum');
        console.log(`table_num: ${table_num}`);
        if (table_num) {
            dispatch(updateTableNum(table_num));
            saveSettings();
        }
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
