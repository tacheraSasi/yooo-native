import * as React from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';

export const NativeAlertDemo: React.FC = () => {
  const showBasicAlert = () => {
    Alert.alert('Alert Title', 'This is a basic alert message.', [
      { text: 'OK' },
    ]);
  };

  const showConfirmAlert = () => {
    Alert.alert('Confirm Action', 'Are you sure you want to proceed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => console.log('User confirmed'),
      },
    ]);
  };

  const showDestructiveAlert = () => {
    Alert.alert('Delete Item', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => console.log('Item deleted'),
      },
    ]);
  };

  const showMultipleChoicesAlert = () => {
    Alert.alert('Choose an option', 'What would you like to do?', [
      { text: 'Option 1', onPress: () => console.log('Option 1 selected') },
      { text: 'Option 2', onPress: () => console.log('Option 2 selected') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Native Alert Examples
      </Text>

      <View style={{ gap: 10 }}>
        <Button title="Basic Alert" onPress={showBasicAlert} />
        <Button title="Confirmation Alert" onPress={showConfirmAlert} />
        <Button title="Destructive Alert" onPress={showDestructiveAlert} />
        <Button title="Multiple Choices" onPress={showMultipleChoicesAlert} />
      </View>
    </ScrollView>
  );
};
