import React from 'react';
import { Animated } from 'react-native';
import { alert } from 'yooo-native';

// Your exact usage converted to yooo-native
const deleteRecording = (
  recording: any,
  translateX: Animated.Value,
  removeRecording: any
) => {
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
                const file = new FileSystem.File(recording.uri);
                await file.delete();
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
};

// More examples of alert.dialog() usage:

// Simple OK dialog
export const showSimpleAlert = () => {
  alert.dialog('Alert Title', 'This is a simple alert message.');
};

// Yes/No confirmation
export const showConfirmation = () => {
  alert.dialog('Confirm Action', 'Are you sure you want to proceed?', [
    { text: 'No', style: 'cancel' },
    { text: 'Yes', onPress: () => console.log('User confirmed') },
  ]);
};

// Three button dialog
export const showThreeButtonAlert = () => {
  alert.dialog('Choose Action', 'What would you like to do with this item?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Save', onPress: () => console.log('Saved') },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: () => console.log('Deleted'),
    },
  ]);
};

// Destructive action with async handling
export const showDestructiveAlert = () => {
  alert.dialog(
    'Delete Account',
    'This will permanently delete your account and all data. This cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete Account',
        style: 'destructive',
        onPress: async () => {
          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Account deleted');
            alert.success(
              'Account Deleted',
              'Your account has been permanently deleted.'
            );
          } catch (error) {
            alert.error('Error', 'Failed to delete account. Please try again.');
          }
        },
      },
    ]
  );
};

// Custom styled dialog
export const showCustomAlert = () => {
  alert.dialog(
    'Custom Alert',
    'This alert has custom styling.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Continue', onPress: () => console.log('Continued') },
    ],
    {
      // You can add custom styling here
      description: 'Additional description text',
      icon: '⚠️',
    }
  );
};
