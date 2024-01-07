import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import SignUpComponent from "../components/SignUpComponent";
import EmailCheckComponent from "../components/EmailCheckComponent";
import { useAtom } from "jotai";
import { checkedEmailAtom, userAtom, userExistsAtom } from "../utils/atoms";
import SignInComponent from "../components/SignInComponent";
import UserProfileComponent from "../components/UserProfileComponent";

interface ProfileScreenProps {
  navigation: any; // Use the correct type for your navigation prop, e.g., NavigationProp
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [checkedEmail] = useAtom(checkedEmailAtom);
  const [userExists] = useAtom(userExistsAtom);
  const [user] = useAtom(userAtom);
  return (
    <View style={styles.safeArea}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D0D0D0", // Primary text color on dark background
    marginTop: 20,
    marginBottom: 10, // Adjust as needed
    paddingHorizontal: 16, // Match with your container padding
    textAlign: "left", // Assuming you want the title centered as per modern design trends
  },
  subtitleText: {
    fontSize: 16,
    color: "#A0A0A0", // Secondary text color for less emphasis
    paddingHorizontal: 16, // Match with your container padding
    textAlign: "left", // If you want the subtitle centered
    lineHeight: 24, // Adjust line-height for better readability
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
