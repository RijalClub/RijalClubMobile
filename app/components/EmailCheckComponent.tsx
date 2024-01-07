import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Input,
  InputField,
  Button,
  VStack,
  Text,
  View,
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
  const [, setCheckedEmail] = useAtom(checkedEmailAtom);
  const [, setUserExists] = useAtom(userExistsAtom);

  const checkUserExists = async () => {
    const lowerCaseEmail = email.toLocaleLowerCase();
    setIsChecking(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        "listUserByEmail",
        {
          body: { email: lowerCaseEmail },
        },
      );
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
    <VStack space="md" alignItems="center" padding={20}>
      <View alignItems="center">
        <Heading size="xl" bold color="white">
          Sign in to Rijal Club
        </Heading>
        <Text color="gray" style={{ textAlign: "center" }}>
          Please enter your email & password to continue to your personal
          account.
        </Text>
      </View>
      <Input>
        <InputField
          type="text"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#a1a1a1"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          color="white"
          autoCorrect={false}
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
