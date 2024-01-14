import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { VStack, Button, View, Text, ButtonText } from "@gluestack-ui/themed";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom, checkedEmailAtom, userExistsAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";
import DropdownComponent from "./DropdownComponent";

const positions = [
  { id: 0, name: "No Preference", value: "no-preference" },
  { id: 1, name: "Goalkeeper", value: "goalkeeper" },
  { id: 2, name: "Defender", value: "defender" },
  { id: 3, name: "Midfielder", value: "midfielder" },
  { id: 4, name: "Forward", value: "forward" },
];

const findNameByValue = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      return arr[i].name;
    }
  }
  return "";
  console.log(value);
};

const UserProfileComponent = () => {
  const [user, setUser] = useAtom(userAtom);
  const [, setCheckedEmail] = useAtom(checkedEmailAtom);
  const [, setUserExists] = useAtom(userExistsAtom);
  const [dropdownOne, setDropdownOne] = useState("");
  const [dropdownTwo, setDropdownTwo] = useState("");
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    if (
      dropdownOne !== "" &&
      user?.preferred_position?.posOne !== dropdownOne
    ) {
      setChanged(true);
    }
    if (
      dropdownTwo !== "" &&
      user?.preferred_position?.posTwo !== dropdownTwo
    ) {
      setChanged(true);
    }
    if (
      (user?.preferred_position?.posOne === dropdownOne &&
        user?.preferred_position?.posTwo === dropdownTwo) ||
      (user?.preferred_position?.posOne === dropdownOne &&
        dropdownTwo === "") ||
      (user?.preferred_position?.posTwo === dropdownTwo && dropdownOne === "")
    ) {
      setChanged(false);
    }
  }, [dropdownOne, dropdownTwo]);

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

  const handleSaveButton = async () => {
    const preferredPositions = {
      posOne: dropdownOne,
      posTwo: dropdownTwo,
    };
    const usersData = await supabase
      .from("users")
      .update({ preferred_position: preferredPositions })
      .eq("id", user?.id);

    if (usersData.error) {
      console.error(usersData.error);
    } else {
      if (typeof usersData.data === "object" && usersData.data !== null) {
        // @ts-ignore
        setUser({ ...user, ...usersData.data });
      }
    }
    setChanged(false);
    console.log(user);
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
        <DropdownComponent
          options={positions}
          setDropdownValue={setDropdownOne}
          placeHolderText={"Select Your Preferred Option 1"}
          selected={
            user?.preferred_position?.posOne &&
            findNameByValue(positions, user?.preferred_position?.posOne)
          }
        />
        <DropdownComponent
          options={positions}
          setDropdownValue={setDropdownTwo}
          placeHolderText={"Select Your Preferred Option 2"}
          selected={
            user?.preferred_position?.posTwo &&
            findNameByValue(positions, user?.preferred_position?.posTwo)
          }
        />
        {isChanged && (
          <Button onPress={handleSaveButton} style={styles.button}>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        )}

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
