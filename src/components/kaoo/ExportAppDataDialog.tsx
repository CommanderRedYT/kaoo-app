import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSettingsJson, saveFromJson } from '@src/utils/settings';

export default function ExportAppDataDialog({
  dialogVisible,
  setDialogVisible,
}: {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
}) {
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
            <TextInput
              multiline
              value={configState}
              onChangeText={setConfigState}
            />
          </Dialog.Content>
        </ScrollView>
      </Dialog>
    </Portal>
  );
}
