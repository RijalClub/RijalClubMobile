import React from "react";
import { Pressable } from "react-native";
import { Image, Box } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

const HeaderComponent = ({ navigation }) => {
  const onMenuPress = () => {
    navigation.toggleDrawer();
  };

  const onProfilePress = () => {
    navigation.navigate("Profile");
  };

  const onHomePress = () => {
    navigation.navigate("Home");
  };

  return (
    <Box
      backgroundColor="#121212"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      height={60}
      paddingHorizontal={10}
    >
      <Pressable onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="white" />
      </Pressable>
      <Pressable onPress={onHomePress} flex={1} alignItems="center">
        <Image
          source={require("../../assets/logo.png")} // Rijal logo
          width={34}
          height={34}
          borderRadius={17}
          resizeMode="contain"
          alt="App logo"
        />
      </Pressable>
      <Pressable onPress={onProfilePress}>
        <Ionicons name="person-circle" size={24} color="white" />
      </Pressable>
    </Box>
  );
};

export default HeaderComponent;
