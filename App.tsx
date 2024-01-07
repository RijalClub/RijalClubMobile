import { config } from "@gluestack-ui/config";
import { expo } from "./app.json";
import React, { useState } from "react";
import { AppRegistry } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import App from "./app/App";
import SplashScreen from "./app/screens/SplashScreen";
import WelcomeModalComponent from "./app/components/WelcomeModalComponent";

export const Main: React.FC = () => {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);

  const handleAnimationComplete = () => {
    setIsSplashActive(false);
    setIsWelcomeModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#121212" }}>
          <SafeAreaView style={{ flex: 1 }}>
            {!isSplashActive && isWelcomeModalVisible && (
              <WelcomeModalComponent />
            )}
            {/* change back to isSplashActive below */}
            {false ? (
              <SplashScreen onAnimationComplete={handleAnimationComplete} />
            ) : (
              <App />
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(expo.name, () => Main);
export default Main;
