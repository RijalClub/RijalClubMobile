import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import FitnessScreen from "./fitness";
import ProfileScreen from "./screens/ProfileScreen";
import FootballScreen from "./screens/FootballScreen";

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Avatar.Image size={100} source={require("../assets/logo.png")} />
      <Text>Welcome to the Rijal App!!!</Text>
    </View>
  );
}

function Fitness() {
  return (
    <FitnessScreen></FitnessScreen>
  );
}

function Football() {
  return (
    <FootballScreen></FootballScreen>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Football"
        component={Football}
        options={{
          tabBarLabel: "Football",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="soccer" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Fitness"
        component={Fitness}
        options={{
          tabBarLabel: "Fitness",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="run-fast" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
        tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
