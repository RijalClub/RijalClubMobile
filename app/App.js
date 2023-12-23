import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from "@gluestack-ui/themed";
import FitnessScreen from "./fitness";
import ProfileScreen from "./screens/ProfileScreen";
import FootballScreen from "./screens/FootballScreen";

function Feed() {
  return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Avatar>
              <AvatarFallbackText>Initials</AvatarFallbackText>
              <AvatarImage
                  source={require("../assets/logo.png")}
                  alt={"Rijal Logo"}
              />
          </Avatar>
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

const Tab = createBottomTabNavigator();

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
