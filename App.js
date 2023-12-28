import * as React from "react";
import {AppRegistry, UIManager} from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { config } from "@gluestack-ui/config"
import { expo } from "./app.json";
import App from "./app/App";
import SplashScreen from "./app/screens/SplashScreen";
import WelcomeModalComponent from "./app/components/WelcomeModalComponent";

export default function Main() {
  const [isSplashActive, setIsSplashActive] = React.useState(true);
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = React.useState(false);

  const handleAnimationComplete = () => {
    setIsSplashActive(false);
    setIsWelcomeModalVisible(true);
  };

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider config={config}>
          <SafeAreaProvider style={{ flex: 1, backgroundColor: '#121212' }} edges={['top', "bottom"]}>
              <SafeAreaView style={{ flex: 1 }}>
                  {!isSplashActive && isWelcomeModalVisible && <WelcomeModalComponent />}
                  {isSplashActive ? <SplashScreen onAnimationComplete={handleAnimationComplete} /> : <App />}
              </SafeAreaView>
          </SafeAreaProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
