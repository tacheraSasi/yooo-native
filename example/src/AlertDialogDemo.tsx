import * as React from 'react';
import { Animated, Button, ScrollView, Text, View } from 'react-native';
import { alert } from 'yooo-native';

export const AlertDialogDemo: React.FC = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  // Mock data and functions for examples
  const recording = {
    id: '1',
    title: 'My Recording',
    uri: 'file://recording.mp3',
  };

  const removeRecording = async (id: string) => {
    console.log('Recording removed:', id);
    alert.success(
      'Recording Deleted',
      'The recording has been successfully deleted.'
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Alert Dialog Examples 🎉
      </Text>

      <View style={{ gap: 15 }}>
        {/* Basic dialog */}
        <Button
          title="Basic Alert Dialog"
          onPress={() => {
            alert.dialog('Alert Title', 'This is a basic alert message.');
          }}
        />

        {/* Confirmation dialog */}
        <Button
          title="Confirmation Dialog"
          onPress={() => {
            alert.dialog(
              'Confirm Action',
              'Are you sure you want to proceed?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', onPress: () => console.log('Confirmed!') },
              ]
            );
          }}
        />

        {/* Destructive action */}
        <Button
          title="Destructive Action"
          onPress={() => {
            alert.dialog('Delete Item', 'This action cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => console.log('Item deleted'),
              },
            ]);
          }}
        />

        {/* Multiple options */}
        <Button
          title="Multiple Options"
          onPress={() => {
            alert.dialog(
              'Choose Action',
              'What would you like to do with this item?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Save', onPress: () => console.log('Saved') },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => console.log('Deleted'),
                },
              ]
            );
          }}
        />

        {/* Real-world example: Delete with animation */}
        <View
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Real Example: Delete Recording
          </Text>
          <Text style={{ marginBottom: 15, color: '#666' }}>
            This shows how to replace Alert.alert() with yooo-native
          </Text>
          <Button
            title="Delete Recording (with animation)"
            onPress={() => {
              alert.dialog(
                'Delete Recording',
                `Are you sure you want to delete "${recording.title}"? This action cannot be undone.`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                      }).start();
                    },
                  },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        // Animate out before deleting
                        Animated.timing(translateX, {
                          toValue: -500,
                          duration: 300,
                          useNativeDriver: true,
                        }).start(async () => {
                          try {
                            // Simulate file deletion
                            console.log('Deleting file:', recording.uri);
                            await removeRecording(recording.id);
                          } catch (error) {
                            console.error('Error deleting recording:', error);
                            alert.error('Error', 'Failed to delete recording.');
                          }
                        });
                      } catch (error) {
                        console.error('Error in delete animation:', error);
                        Animated.spring(translateX, {
                          toValue: 0,
                          useNativeDriver: true,
                        }).start();
                      }
                    },
                  },
                ]
              );
            }}
          />
        </View>

        {/* Quick actions */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Quick Alert Methods:
          </Text>
          <View style={{ gap: 10 }}>
            <Button
              title="alert.success()"
              onPress={() =>
                alert.success('Success!', {
                  description: 'Everything worked perfectly!',
                })
              }
            />
            <Button
              title="alert.error()"
              onPress={() =>
                alert.error('Error!', { description: 'Something went wrong!' })
              }
            />
            <Button
              title="alert.confirm()"
              onPress={() =>
                alert.confirm('Quick confirm?', {
                  onConfirm: () => console.log('Quick confirmed'),
                  onCancel: () => console.log('Quick cancelled'),
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
