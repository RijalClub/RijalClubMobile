import React, { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Box,
  Text,
  ButtonText,
  Center,
  HStack,
  Switch,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom, checkedEmailAtom, userExistsAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";
import DropdownComponent from "./DropdownComponent";

const positions = [
  { id: 0, name: "No Preference", value: "no-preference" },
  { id: 1, name: "Goalkeeper", value: "goalkeeper" },
  { id: 2, name: "Defender", value: "defender" },
  { id: 3, name: "Midfielder", value: "midfielder" },
  { id: 4, name: "Striker", value: "striker" },
];

const findNameByValue = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      return arr[i].name;
    }
  }
  return "";
};

const UserProfileComponent = () => {
  const [user, setUser] = useAtom(userAtom);
  const [, setCheckedEmail] = useAtom(checkedEmailAtom);
  const [, setUserExists] = useAtom(userExistsAtom);
  const [dropdownOne, setDropdownOne] = useState("");
  const [dropdownTwo, setDropdownTwo] = useState("");
  const [isChanged, setChanged] = useState(false);
  const [isCapPref, setIsCapPref] = useState(true);

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

    setIsCapPref(user?.metadata?.captainPref || false);
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

  const handleCaptainPreference = async () => {
    const userMeta = { ...user?.metadata, captainPref: isCapPref };
    setIsCapPref(!isCapPref);
    const usersData = await supabase
      .from("users")
      .update({ metadata: userMeta })
      .eq("id", user?.id);
    if (usersData.error) {
      console.error(usersData.error);
    } else {
      if (typeof usersData.data === "object" && usersData.data !== null) {
        // @ts-ignore
        setUser({ ...user, ...usersData.data });
      }
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
  };

  return (
    <Center>
      <VStack
        space="4xl"
        alignItems="center"
        height={"100%"}
        justifyContent="center"
        // width={"100%"}
      >
        <VStack
          space="lg"
          borderWidth={2}
          borderColor="#cccccc"
          borderRadius={10}
          padding={15}
          width={300}
          maxWidth={"90%"}
          height={300}
          justifyContent="center"
        >
          <Center>
            <Ionicons name="person-circle-outline" size={100} color="#cccccc" />
          </Center>
          <HStack justifyContent="center">
            <Box>
              <Text color="white" fontWeight="bold" textAlign="right" mb={5}>
                Email:{" "}
              </Text>
              <Text color="white" fontWeight="bold" textAlign="right" mb={5}>
                First Name:{" "}
              </Text>
              <Text color="white" fontWeight="bold" textAlign="right">
                Last Name:{" "}
              </Text>
            </Box>
            <Box>
              <Text color="white" mb={5}>
                {user?.email}
              </Text>
              <Text color="white" mb={5}>
                {user?.user_metadata?.first_name}
              </Text>
              <Text color="white">{user?.user_metadata?.last_name}</Text>
            </Box>
          </HStack>
        </VStack>
        <VStack
          space="md"
          borderWidth={2}
          borderColor="#cccccc"
          borderRadius={10}
          padding={15}
          width={300}
          maxWidth={"90%"}
        >
          <Text fontSize={"$md"} color="white" fontWeight="bold">
            Preferred positions:
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
          <HStack space="md" alignItems="center">
            <Switch
              value={isCapPref}
              isRequired={false}
              onToggle={handleCaptainPreference}
            />
            <Text size="sm" color="white" fontSize={"$md"}>
              {" "}
              Want to be Captain ?
            </Text>
          </HStack>

          {isChanged && (
            <Button onPress={() => handleSaveButton()}>
              <ButtonText>Save Changes</ButtonText>
            </Button>
          )}
        </VStack>
        <Button onPress={handleSignOut} action="negative" borderRadius={10}>
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </VStack>
    </Center>
  );
};

export default UserProfileComponent;
