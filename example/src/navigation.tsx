import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastDemo } from './ToastDemo';
import { AlertDemo } from './AlertDemo';
import { AlertDialogDemo } from './AlertDialogDemo';

function HomeScreen({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'Home'>) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Button
        title="Show modal"
        onPress={() => {
          navigation.getParent()?.navigate('Modal');
        }}
      />
      <ToastDemo />
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AlertDemo />
    </SafeAreaView>
  );
}

function AlertDialogScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AlertDialogDemo />
    </SafeAreaView>
  );
}

type HomeStackParamList = {
  Home: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

type SettingsStackParamList = {
  Settings: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

type AlertStackParamList = {
  AlertDialog: undefined;
};

const AlertStack = createNativeStackNavigator<AlertStackParamList>();

function AlertStackScreen() {
  return (
    <AlertStack.Navigator>
      <AlertStack.Screen name="AlertDialog" component={AlertDialogScreen} />
    </AlertStack.Navigator>
  );
}

type RootStackParamList = {
  Tab: undefined;
  Modal: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const MainTab: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Toasts" component={HomeStackScreen} />
      <Tab.Screen name="Alerts" component={SettingsStackScreen} />
      <Tab.Screen name="Dialogs" component={AlertStackScreen} />
    </Tab.Navigator>
  );
};

const ToastDemoModal: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ToastDemo />
    </SafeAreaView>
  );
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Tab"
          component={MainTab}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Modal"
          component={ToastDemoModal}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
