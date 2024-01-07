import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Input,
  VStack,
  Button,
  Text,
  View,
  InputField,
  ButtonText,
  Heading,
  InputSlot,
} from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { Ionicons } from "@expo/vector-icons";
import { emailAtom, passwordAtom, userAtom } from "../utils/atoms"; // Define these atoms as needed
import supabase from "../utils/supabaseClient";

const SignInComponent = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setUserSession] = useAtom(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState(null);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setSignInError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUserSession(data.user);
      setIsLoading(false);
    } catch (error) {
      // Handle error, could set an error state and display it
      console.error("Error signing in:", error.message);
      setSignInError(error.message);
      setIsLoading(false);
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
      <Input color="gray">
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
      <Input
        variant="outline"
        size="sm"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          color="white"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Ionicons name="eye-sharp" size={20} color="gray" />
          ) : (
            <Ionicons name="eye-off-sharp" size={20} color="gray" />
          )}
        </InputSlot>
      </Input>
      <Button variant="solid" onPress={handleSignIn}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonText>Sign In</ButtonText>
        )}
      </Button>
      {signInError && <Text color="red">{signInError}</Text>}
    </VStack>
  );
};

export default SignInComponent;
