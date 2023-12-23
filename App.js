import * as React from "react";
import { AppRegistry } from "react-native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { expo } from "./app.json";
import App from "./app/App";

export default function Main() {
  return (
    <GluestackUIProvider config={config}>
      <App />
    </GluestackUIProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
