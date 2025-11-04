# React Native Toasts & Alerts

An opinionated toast and alert component for React Native. Extended version of sonner-native with alert dialog support.

![sonner-native](https://github.com/user-attachments/assets/0baf95df-9c99-4db6-877e-1edcc0eca0d4)

## Features

### Toast Features

- API fully matches [Sonner's](https://sonner.emilkowal.ski/)
- Multiple variants, including `success`, `error`, `warning`, `custom`, `promise`
- Promise variant with built-in loading state
- Custom JSX with the custom variant
- Top or bottom positions
- Title and description
- Action button with a callback
- Custom icons
- Optionally dismissable with swipe, configurable left or up
- Dismissable with toast.dismiss(), one or all toasts

### Alert Dialog Features (NEW)

- Modal-style alert dialogs using the same system
- `alert.success()`, `alert.error()`, `alert.warning()`, `alert.info()`
- `alert.confirm()` for confirmation dialogs with callbacks
- `alert.custom()` for custom JSX content
- Non-dismissible by default (requires explicit action)
- Centered positioning
- Action and cancel buttons

### General Features

- Highly performant using Reanimated 3, 60 FPS
- Dark mode built-in
- Works with Expo
- NativeWind supported
- Customizable via styles props
- Works outside of React components

## Showcase

<img width="416" alt="Screenshot 2024-09-06 at 16 33 10" src="https://github.com/user-attachments/assets/fb986f0f-6f5a-4716-9633-6dfe492a9e9c">
<img width="388" alt="Screenshot 2024-09-06 at 16 32 27" src="https://github.com/user-attachments/assets/8fa438c4-3c65-4f8f-ad15-52cc24e1faf5">
<img width="392" alt="Screenshot 2024-09-06 at 16 32 33" src="https://github.com/user-attachments/assets/fe43bc29-5d25-4e32-a88c-bba6e58a6eda">
<img width="388" alt="Screenshot 2024-09-06 at 16 32 39" src="https://github.com/user-attachments/assets/ead85100-b52e-433a-b8b8-9416cfb79b63">
<img width="406" alt="Screenshot 2024-09-06 at 16 33 04" src="https://github.com/user-attachments/assets/bbc20957-160f-43c1-b317-b64512ec7cef">

## Expo Snack

[https://snack.expo.dev/@gunnartorfis/sonner-native](https://snack.expo.dev/@gunnartorfis/sonner-native)

## Installation

```sh
npm install yooo-native
# or
yarn add yooo-native
```

#### Requirements

To use this package, **you also need to install its peer dependencies**. Check out their documentation for more information:

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native Safe Area Context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)

## Usage

### In your App.tsx/entry point

```typescript
import { Toaster } from 'yooo-native';

function App() {
  return (
    <View>
      <NavigationContainer>...</NavigationContainer>
      <Toaster />
    </View>
  );
}
```

### Using Toasts

```typescript
import { toast } from 'yooo-native';

// Basic toast
toast('Yooo! Hello World 🎉');

// Toast variants
toast.success('Yooo! Success! ✅');
toast.error('Yooo! Error! ❌');
toast.warning('Yooo! Warning! ⚠️');
toast.info('Yooo! Info! ℹ️');
```

### Using Alert Dialogs

```typescript
import { alert } from 'yooo-native';

// Basic alerts
alert.info('Yooo! Information message');
alert.success('Yooo! Operation completed!');
alert.error('Yooo! Something went wrong');

// Simple confirmation
alert.confirm('Yooo! Are you sure?', {
  onConfirm: () => console.log('User confirmed'),
  onCancel: () => console.log('User cancelled')
});

// Advanced dialog (matches Alert.alert() API)
alert.dialog(
  'Delete Item',
  'Are you sure you want to delete this item? This action cannot be undone.',
  [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        // Your delete logic here
        console.log('Item deleted');
      }
    }
  ]
);

// Custom alert with JSX
alert.custom(
  <YourCustomComponent />
);
```

### Replacing React Native's Alert.alert()

You can directly replace React Native's `Alert.alert()` with `alert.dialog()`:

```typescript
// Before (React Native)
import { Alert } from 'react-native';
Alert.alert('Title', 'Message', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'OK', onPress: () => console.log('OK') },
]);

// After (yooo-native)
import { alert } from 'yooo-native';
alert.dialog('Title', 'Message', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'OK', onPress: () => console.log('OK') },
]);
```

### Show a toast

```typescript
import { toast } from 'sonner-native';

function SomeComponent() {
  return (
    <Button
      title="Show Toast"
      onPress={() => toast('Hello, World!')}
    />
  );
}
```

### Web support

Even though Sonner Native works on the web, it is not recommended to use it there. Instead, use the original [Sonner](https://sonner.emilkowal.ski/).

The following setup is recommended. Add a `sonner.ts` and `sonner.web.ts` file to your project and import from there instead of from this library directly. That way, sonner will be used on the web and sonner-native on native.

```ts
// sonner.ts
export * from 'sonner-native';
```

```ts
// sonner.web.ts
export * from 'sonner';
```

## Documentation

For more advanced usage, check out the [documentation](https://gunnartorfis.github.io/sonner-native/)

## Recording

https://github.com/user-attachments/assets/ccc428ca-37c3-4589-9e8c-f414c40d764c

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
