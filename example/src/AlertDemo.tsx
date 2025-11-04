import * as React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { alert } from 'sonner-native';

export const AlertDemo: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Alert Dialog Examples
      </Text>

      <View style={{ gap: 10 }}>
        <Button
          title="Basic Info Alert"
          onPress={() => {
            alert.info('This is an information alert', {
              description: 'This alert will stay on screen until dismissed.',
            });
          }}
        />

        <Button
          title="Success Alert"
          onPress={() => {
            alert.success('Operation completed successfully!', {
              description: 'Your data has been saved.',
            });
          }}
        />

        <Button
          title="Error Alert"
          onPress={() => {
            alert.error('Something went wrong', {
              description: 'Please try again later or contact support.',
            });
          }}
        />

        <Button
          title="Warning Alert"
          onPress={() => {
            alert.warning('Are you sure?', {
              description: 'This action cannot be undone.',
            });
          }}
        />

        <Button
          title="Confirmation Alert"
          onPress={() => {
            alert.confirm('Delete this item?', {
              description: 'This action cannot be undone.',
              onConfirm: () => {
                console.log('Item deleted');
                // Perform delete action
              },
              onCancel: () => {
                console.log('Delete cancelled');
              },
            });
          }}
        />

        <Button
          title="Custom Alert with Actions"
          onPress={() => {
            alert.info('Custom Alert', {
              description: 'This alert has custom action buttons.',
              action: {
                label: 'Save',
                onClick: () => {
                  console.log('Save pressed');
                  alert.dismiss();
                },
              },
              cancel: {
                label: 'Discard',
                onClick: () => {
                  console.log('Discard pressed');
                  alert.dismiss();
                },
              },
            });
          }}
        />

        <Button
          title="Custom JSX Alert"
          onPress={() => {
            alert.custom(
              <View style={{ padding: 20 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}
                >
                  Custom Content Alert
                </Text>
                <Text style={{ marginBottom: 15 }}>
                  You can put any React Native component here!
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Button title="OK" onPress={() => alert.dismiss()} />
                  <Button title="Cancel" onPress={() => alert.dismiss()} />
                </View>
              </View>
            );
          }}
        />

        <Button
          title="Dismiss All Alerts"
          onPress={() => {
            alert.dismiss();
          }}
        />
      </View>
    </ScrollView>
  );
};
