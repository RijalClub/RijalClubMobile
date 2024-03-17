import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import SignUpComponent from "../components/SignUpComponent";
import EmailCheckComponent from "../components/EmailCheckComponent";
import { useAtom } from "jotai";
import { checkedEmailAtom, userAtom, userExistsAtom } from "../utils/atoms";
import SignInComponent from "../components/SignInComponent";
import UserProfileComponent from "../components/UserProfileComponent";
import { Box } from "@gluestack-ui/themed";

interface ProfileScreenProps {
  navigation: any; // Use the correct type for your navigation prop, e.g., NavigationProp
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [checkedEmail] = useAtom(checkedEmailAtom);
  const [userExists] = useAtom(userExistsAtom);
  const [user] = useAtom(userAtom);
  return (
    <Box backgroundColor="#121212" height={"100%"}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <HeaderComponent navigation={navigation} />
      {user ? (
        <UserProfileComponent />
      ) : !checkedEmail ? (
        <EmailCheckComponent />
      ) : userExists ? (
        <SignInComponent />
      ) : (
        <SignUpComponent />
      )}
    </Box>
  );
};

export default ProfileScreen;
