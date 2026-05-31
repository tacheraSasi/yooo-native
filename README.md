# yooo-native

A React Native UI library with toasts, alerts, and ready-to-use components — built on Reanimated 3 for smooth 60 FPS animations.

<!-- ![yooo-native](https://github.com/user-attachments/assets/0baf95df-9c99-4db6-877e-1edcc0eca0d4) -->

## Features

- **Toasts** — success, error, warning, info, promise, and custom variants
- **Alert Dialogs** — drop-in replacement for `Alert.alert()` with `alert.dialog()`
- **UI Components** — Button, Input, Switch, Badge, Avatar, Card, Spinner, Label, Separator
- **14+ SVG Icons** — Check, Bell, Heart, Star, ChevronRight, and more
- **Theming** — built-in dark mode with `YoooProvider`
- **Performant** — Reanimated 3 animations at 60 FPS
- **Expo & NativeWind** compatible
- **Works outside React components** — call `toast()` or `alert()` from anywhere

## Showcase

<img width="416" alt="Toast demo" src="https://github.com/user-attachments/assets/fb986f0f-6f5a-4716-9633-6dfe492a9e9c">
<img width="388" alt="Alert demo" src="https://github.com/user-attachments/assets/8fa438c4-3c65-4f8f-ad15-52cc24e1faf5">
<img width="392" alt="Components demo" src="https://github.com/user-attachments/assets/fe43bc29-5d25-4e32-a88c-bba6e58a6eda">
<img width="388" alt="Dark mode demo" src="https://github.com/user-attachments/assets/ead85100-b52e-433a-b8b8-9416cfb79b63">
<img width="406" alt="Full demo" src="https://github.com/user-attachments/assets/bbc20957-160f-43c1-b317-b64512ec7cef">

## Installation

```sh
npm install yooo-native
# or
yarn add yooo-native
```

### Peer Dependencies

```sh
npm install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-svg
```

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native Safe Area Context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)

## Quick Start

Wrap your app with `YoooProvider` and add the `Toaster`:

```tsx
import { Toaster, YoooProvider } from 'yooo-native';

export default function App() {
  return (
    <YoooProvider theme="system">
      <NavigationContainer>{/* your screens */}</NavigationContainer>
      <Toaster />
    </YoooProvider>
  );
}
```

## Toasts

```tsx
import { toast } from 'yooo-native';

toast('Hello World');
toast.success('Saved!');
toast.error('Something went wrong');
toast.warning('Check your input');
toast.info('FYI');

// Promise toast with loading state
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Done!',
  error: 'Failed',
});
```

## Alert Dialogs

```tsx
import { alert } from 'yooo-native';

alert.info('Heads up!');
alert.success('Operation completed');
alert.error('Something went wrong');

// Confirmation
alert.confirm('Are you sure?', {
  onConfirm: () => deleteItem(),
  onCancel: () => console.log('Cancelled'),
});

// Drop-in replacement for Alert.alert()
alert.dialog('Delete Item', 'This cannot be undone.', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'Delete', style: 'destructive', onPress: () => deleteItem() },
]);

// Custom JSX
alert.custom(<YourCustomComponent />);
```

## Components

All components are theme-aware via `YoooProvider`.

### Button

```tsx
import { Button, Check } from 'yooo-native';

<Button variant="primary" onPress={save}>Save</Button>
<Button variant="destructive" icon={<Check size={20} color="#FFF" />}>Delete</Button>
<Button variant="ghost" loading>Loading...</Button>
```

Variants: `primary` | `secondary` | `destructive` | `ghost`  
Sizes: `small` | `medium` | `large`

### Input

```tsx
import { Input, Label } from 'yooo-native';

<Label>Email</Label>
<Input placeholder="you@example.com" autoCapitalize="none" />
<Input error placeholder="Required field" />
```

### Switch

```tsx
import { Switch } from 'yooo-native';

<Switch value={enabled} onValueChange={setEnabled} />;
```

Sizes: `small` | `medium`

### Badge

```tsx
import { Badge, Bell } from 'yooo-native';

<Badge variant="success">Active</Badge>
<Badge variant="error">5</Badge>
<Badge variant="info" icon={<Bell size={12} color="#FFF" />}>3 notifications</Badge>
```

Variants: `default` | `success` | `error` | `warning` | `info`

### Avatar

```tsx
import { Avatar } from 'yooo-native';

<Avatar source={{ uri: 'https://example.com/photo.jpg' }} size="large" />
<Avatar name="John Doe" size="medium" backgroundColor="#FF0000" />
```

Sizes: `small` | `medium` | `large` | `xlarge`

### Card

```tsx
import { Card } from 'yooo-native';

<Card variant="elevated"><Text>Elevated card with shadow</Text></Card>
<Card variant="outlined"><Text>Outlined card</Text></Card>
<Card variant="filled"><Text>Filled card</Text></Card>
```

### Spinner

```tsx
import { Spinner } from 'yooo-native';

<Spinner size="medium" color="#007AFF" />;
```

### Label & Separator

```tsx
import { Label, Separator } from 'yooo-native';

<Label>Username</Label>
<Label muted>Optional</Label>
<Separator />
<Separator orientation="vertical" />
```

### Icons

14 SVG icons included:

```tsx
import { CircleCheck, Bell, Heart, Star, Check, Info, X, Loader,
         CircleX, TriangleAlert, AlertCircle, ChevronRight, ChevronDown } from 'yooo-native';

<Bell size={24} color="#007AFF" />
<Heart size={20} color="#FF69B4" />
<Star size={28} color="#FFD700" />
```

See [COMPONENTS.md](./COMPONENTS.md) for full API reference.

<!-- ## Recording

https://github.com/user-attachments/assets/ccc428ca-37c3-4589-9e8c-f414c40d764c -->

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
