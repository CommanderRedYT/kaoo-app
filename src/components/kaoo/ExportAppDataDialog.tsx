import { Button, Dialog, Portal } from 'react-native-paper';
import * as RNPaper from 'react-native-paper';
import { ScrollView } from 'react-native';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSettingsJson, saveFromJson } from '@src/utils/settings';

interface Props {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
}

const ExportAppDataDialog: FC<Props> = ({
  dialogVisible,
  setDialogVisible,
}) => {
  const configStr = useMemo(() => getSettingsJson(true), []);

  const [configState, setConfigState] = useState<string>(configStr);

  useEffect(() => {
    setConfigState(configStr);
  }, [configStr, dialogVisible]);

  const handleSave = useCallback(() => {
    // console.log('save');

    try {
      const config = JSON.parse(configState);
      console.log('success', { config });
      saveFromJson(configState);
    } catch (e) {
      console.log('error', e);
    }
  }, [configState]);

  return (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Config JSON</Dialog.Title>
        <ScrollView>
          <Dialog.Content>
            <Button onPress={handleSave} style={{ marginBottom: 10 }}>
              Save
            </Button>
            <RNPaper.TextInput
              multiline
              value={configState}
              onChangeText={setConfigState}
            />
          </Dialog.Content>
        </ScrollView>
      </Dialog>
    </Portal>
  );
};

export default ExportAppDataDialog;
