import QRCodeScanner from 'react-native-qrcode-scanner';
import type { BarCodeReadEvent } from 'react-native-camera';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { getSearchParamFromURL } from '@src/utils/generic';
import { updateOrderedItems, updateTableNum } from '@src/slices/settings';
import { useDispatch } from '@src/store';
import { saveSettings } from '@src/utils/settings';

export default function TableNumberScanner() {
    const dispatch = useDispatch();
    const [flash, setFlash] = useState(false);

    const onSuccess = (e: BarCodeReadEvent) => {
        const url = e.data;
        const table_num = getSearchParamFromURL(url, 'tablenum');
        console.log(`table_num: ${table_num}`);
        if (table_num) {
            dispatch(updateOrderedItems([]));
            dispatch(updateTableNum(table_num));
            saveSettings();
        }
    };

    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={
                flash
                    ? RNCamera.Constants.FlashMode.torch
                    : RNCamera.Constants.FlashMode.off
            }
            bottomContent={
                <Button onPress={() => setFlash(!flash)}>
                    Toggle Flash {flash ? 'On' : 'Off'}
                </Button>
            }
            reactivate
            reactivateTimeout={1000}
        />
    );
}
