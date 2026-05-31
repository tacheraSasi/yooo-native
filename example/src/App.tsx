import * as React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'yooo-native';
import '../global.css';
import Navigator from './navigation';
// import { ToastWrapper } from './ToastWrapper';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Navigator />
        <Toaster
          position="top-center"
          // offset={100}
          duration={3000}
          swipeToDismissDirection="up"
          visibleToasts={4}
          closeButton
          autoWiggleOnUpdate="toast-change"
          theme="system"
          icons={{
            error: <Text>💥</Text>,
            loading: <Text>🔄</Text>,
          }}
          toastOptions={{
            actionButtonStyle: {
              paddingHorizontal: 20,
            },
          }}
          // ToastWrapper={ToastWrapper}
          pauseWhenPageIsHidden
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
