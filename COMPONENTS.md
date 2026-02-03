# Components

In addition to the toast and alert functionality, yooo-native provides several UI components that can be used to enhance your React Native application.

## Button

A customizable button component with multiple variants and sizes.

### Props

- `children`: The button label (required)
- `onPress`: Function to call when button is pressed
- `variant`: Button style - `'primary'` | `'secondary'` | `'destructive'` | `'ghost'` (default: `'primary'`)
- `size`: Button size - `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `disabled`: Disable the button (default: `false`)
- `loading`: Show loading indicator (default: `false`)
- `style`: Custom container style
- `textStyle`: Custom text style
- `icon`: Optional icon element
- `iconPosition`: Position of icon - `'left'` | `'right'` (default: `'left'`)

### Example

```tsx
import { Button, Check } from 'yooo-native';

function MyComponent() {
  return (
    <>
      <Button variant="primary" onPress={() => console.log('Pressed')}>
        Click Me
      </Button>
      
      <Button 
        variant="destructive" 
        size="large"
        icon={<Check size={20} color="#FFF" />}
        iconPosition="left"
      >
        Delete Item
      </Button>
      
      <Button variant="ghost" loading>
        Loading...
      </Button>
    </>
  );
}
```

## Spinner

An animated loading spinner component using Reanimated.

### Props

- `size`: Spinner size - `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `color`: Spinner color (default: `'#007AFF'`)
- `style`: Custom container style

### Example

```tsx
import { Spinner } from 'yooo-native';

function MyComponent() {
  return (
    <>
      <Spinner size="small" color="#FF0000" />
      <Spinner size="medium" />
      <Spinner size="large" color="#00FF00" />
    </>
  );
}
```

## Badge

A badge component for displaying notification counts or status indicators.

### Props

- `children`: Badge content (required)
- `variant`: Badge style - `'default'` | `'success'` | `'error'` | `'warning'` | `'info'` (default: `'default'`)
- `size`: Badge size - `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `style`: Custom container style
- `textStyle`: Custom text style
- `icon`: Optional icon element

### Example

```tsx
import { Badge, Bell } from 'yooo-native';

function MyComponent() {
  return (
    <>
      <Badge variant="default">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="error">5</Badge>
      <Badge 
        variant="info" 
        icon={<Bell size={12} color="#FFF" />}
      >
        3 notifications
      </Badge>
    </>
  );
}
```

## Avatar

A component for displaying user avatars with initials fallback.

### Props

- `source`: Image source for avatar
- `name`: User's name (used to generate initials)
- `size`: Avatar size - `'small'` | `'medium'` | `'large'` | `'xlarge'` (default: `'medium'`)
- `style`: Custom container style
- `textStyle`: Custom text style
- `backgroundColor`: Background color for initials (default: `'#007AFF'`)
- `textColor`: Text color for initials (default: `'#FFFFFF'`)

### Example

```tsx
import { Avatar } from 'yooo-native';

function MyComponent() {
  return (
    <>
      <Avatar 
        source={{ uri: 'https://example.com/avatar.jpg' }}
        size="medium"
      />
      
      <Avatar 
        name="John Doe"
        size="large"
        backgroundColor="#FF0000"
      />
      
      <Avatar 
        name="Jane Smith"
        size="small"
      />
    </>
  );
}
```

## Card

A container component with different visual variants.

### Props

- `children`: Card content (required)
- `variant`: Card style - `'elevated'` | `'outlined'` | `'filled'` (default: `'elevated'`)
- `style`: Custom container style

### Example

```tsx
import { Card } from 'yooo-native';
import { Text, View } from 'react-native';

function MyComponent() {
  return (
    <>
      <Card variant="elevated">
        <Text>This is an elevated card with shadow</Text>
      </Card>
      
      <Card variant="outlined">
        <Text>This is an outlined card</Text>
      </Card>
      
      <Card variant="filled">
        <Text>This is a filled card</Text>
      </Card>
    </>
  );
}
```

## Icons

yooo-native includes several SVG icons that can be used throughout your application.

### Available Icons

- `CircleCheck` - Success checkmark in circle
- `CircleX` - Error X in circle
- `Info` - Information icon
- `TriangleAlert` - Warning triangle
- `X` - Close/dismiss icon
- `Loader` - Loading spinner icon
- `Bell` - Notification bell
- `Heart` - Heart icon
- `Star` - Star icon
- `Check` - Checkmark
- `AlertCircle` - Alert in circle
- `ChevronRight` - Right arrow
- `ChevronDown` - Down arrow

### Icon Props

All icons accept the following props:

- `size`: Icon size in pixels (default: `24`)
- `color`: Icon color (default: `'currentColor'`)
- Any other SVG props

### Example

```tsx
import { 
  CircleCheck, 
  Bell, 
  Heart, 
  Star, 
  Loader 
} from 'yooo-native';

function MyComponent() {
  return (
    <>
      <CircleCheck size={32} color="#00FF00" />
      <Bell size={24} color="#FF0000" />
      <Heart size={20} color="#FF69B4" />
      <Star size={28} color="#FFD700" />
      <Loader size={24} color="#007AFF" />
    </>
  );
}
```

## Usage in Toasts and Alerts

These components can be used within custom toasts and alerts:

```tsx
import { toast, Button, Badge, Avatar } from 'yooo-native';

// Use components in custom toast
toast.custom(
  <View>
    <Avatar name="John Doe" size="small" />
    <Text>John Doe sent you a message</Text>
    <Badge variant="error">New</Badge>
  </View>
);

// Use Button in toast actions
toast('Message sent successfully', {
  action: (
    <Button variant="ghost" size="small" onPress={() => console.log('Undo')}>
      Undo
    </Button>
  )
});
```
