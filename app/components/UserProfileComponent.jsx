import React from "react";
import { StyleSheet } from "react-native";
import {
  VStack,
  Button,
  View,
  Text,
  ButtonText,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom, checkedEmailAtom, userExistsAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";

const positions = [
  { id: 0, name: "No Preference", value: "no-preference" },
  { id: 1, name: "Goalkeeper", value: "goalkeeper" },
  { id: 2, name: "Defender", value: "defender" },
  { id: 3, name: "Midfielder", value: "midfielder" },
  { id: 4, name: "Forward", value: "forward" },
];

const UserProfileComponent = () => {
  const [user, setUser] = useAtom(userAtom);
  const [, setCheckedEmail] = useAtom(checkedEmailAtom);
  const [, setUserExists] = useAtom(userExistsAtom);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error(error);
      setUser(null); // Clear the user state
      setUserExists(false);
      setCheckedEmail(false);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space="md" style={styles.profileBox}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color="#cccccc"
          style={styles.icon}
        />
        <Text style={styles.header}>Profile</Text>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <Text style={styles.info}>
          First Name: {user?.user_metadata?.first_name}
        </Text>
        <Text style={styles.info}>
          Surname: {user?.user_metadata?.last_name}
        </Text>

        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput
              placeholder="Select option"
              style={{ color: "white" }}
            />
            <SelectIcon mr="$3">
              <AntDesign name="caretdown" size={15} color="white" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {positions.map((position) => (
                <SelectItem
                  label={position.name}
                  value={position.value}
                  key={position.id}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput
              placeholder="Select option"
              style={{ color: "white" }}
            />
            <SelectIcon mr="$3">
              <AntDesign name="caretdown" size={15} color="white" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {positions.map((position) => (
                <SelectItem
                  label={position.name}
                  value={position.value}
                  key={position.id}
                  color={"white"}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        {/* Add more user info here */}
        <Button onPress={handleSignOut} style={styles.button}>
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  profileBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff3333", // A contrasting color for the sign-out button
  },
});

export default UserProfileComponent;
