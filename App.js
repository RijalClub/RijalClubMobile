import * as React from "react";
import { AppRegistry } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { config } from "@gluestack-ui/config"
import { expo } from "./app.json";
import App from "./app/App";
import SplashScreen from "./app/screens/SplashScreen";

export default function Main() {
  const [isSplashActive, setIsSplashActive] = React.useState(true);

  const handleAnimationComplete = () => {
    setIsSplashActive(false);
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider style={{ flex: 1 }} edges={['top', "bottom"]}>
        {isSplashActive ? <SplashScreen onAnimationComplete={handleAnimationComplete} /> : <App />}
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
