import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Input,
  InputField,
  Button,
  VStack,
  Text,
  Box,
  ButtonText,
  Heading,
  InputSlot,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { emailAtom, checkedEmailAtom, userExistsAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";

const EmailCheckComponent: React.FC = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedEmail, setCheckedEmail] = useAtom(checkedEmailAtom);
  const [, setUserExists] = useAtom(userExistsAtom);

  const checkUserExists = async () => {
    const lowerCaseEmail = email.toLocaleLowerCase();
    setIsChecking(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("email-check", {
        body: { email: lowerCaseEmail },
      });
      if (error) {
        console.error("Error checking user:", error);
      } else {
        setUserExists(data.userExists);
        setCheckedEmail(true);
      }
      setIsChecking(false);
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again.");
      setIsChecking(false);
    }
  };

  return (
    <VStack
      space="4xl"
      alignItems="center"
      height="90%"
      padding="10%"
      justifyContent="center"
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        height={100}
      >
        <Heading size="xl" bold color="white" letterSpacing={"$md"}>
          Sign in to Rijal Club
        </Heading>
        <Text color="white" textAlign="center">
          Please enter your email & password to view your personal account.
        </Text>
      </Box>

      <Input>
        <InputField
          type="text"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          color="white"
        />
        <InputSlot pr="$3">
          <Ionicons name="mail" size={20} color="gray" />
        </InputSlot>
      </Input>
      <Button variant="solid" onPress={checkUserExists}>
        {isChecking ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonText>Enter</ButtonText>
        )}
      </Button>
      {error && <Text color="red">{error}</Text>}
    </VStack>
  );
};

export default EmailCheckComponent;
