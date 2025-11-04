import * as React from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';

interface AlertExamplesProps {}

export const AlertExamples: React.FC<AlertExamplesProps> = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Alert Dialog Examples
      </Text>

      <View style={{ gap: 15 }}>
        {/* Basic Alert */}
        <Button
          title="Basic Alert"
          onPress={() => {
            Alert.alert('Alert Title', 'This is a basic alert message.');
          }}
        />

        {/* Confirmation Alert */}
        <Button
          title="Confirmation Alert"
          onPress={() => {
            Alert.alert('Confirm Action', 'Are you sure you want to proceed?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => console.log('Confirmed') },
            ]);
          }}
        />

        {/* Destructive Alert */}
        <Button
          title="Delete Confirmation"
          onPress={() => {
            Alert.alert('Delete Item', 'This action cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => console.log('Item deleted'),
              },
            ]);
          }}
        />

        {/* Multiple Options */}
        <Button
          title="Multiple Choices"
          onPress={() => {
            Alert.alert('Choose an option', 'What would you like to do?', [
              { text: 'Save', onPress: () => console.log('Saved') },
              { text: 'Discard', onPress: () => console.log('Discarded') },
              { text: 'Cancel', style: 'cancel' },
            ]);
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 40,
          marginBottom: 15,
        }}
      >
        Custom Toast-based Alerts
      </Text>

      <Text style={{ marginBottom: 15, color: '#666' }}>
        If you want more styling control, you can use the custom alert functions
        that extend the existing toast system for modal-like behavior.
      </Text>

      <View style={{ gap: 15 }}>
        {/* Note: These would use the custom alert functions if available */}
        <Button
          title="Custom Info Alert"
          onPress={() => {
            // alert.info('Custom Alert', { description: 'This uses the toast system' });
            console.log('Custom alert would show here');
          }}
        />

        <Button
          title="Custom Confirm Alert"
          onPress={() => {
            // alert.confirm('Are you sure?', {
            //   onConfirm: () => console.log('Confirmed'),
            //   onCancel: () => console.log('Cancelled')
            // });
            console.log('Custom confirm alert would show here');
          }}
        />
      </View>
    </ScrollView>
  );
};
