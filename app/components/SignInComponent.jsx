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
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  InputIcon,
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

  const handleSignIn = async () => {
    setIsLoading(true);
    setSignInError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error(error);

      const user = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();
      setUserSession({ ...data.user, ...user.data });

      setIsLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error, could set an error state and display it
      console.error("Error signing in:", error.message);
      setSignInError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <VStack
      space="4xl"
      alignItems="center"
      height={"90%"}
      padding={"10%"}
      justifyContent="center"
    >
      <View
        justifyContent="space-between"
        alignItems="center"
        // borderWidth={1} borderColor="white"
        height={100}
      >
        <Heading size="xl" bold color="white" letterSpacing={"$md"}>
          Sign in to Rijal Club
        </Heading>
        <Text color="white" textAlign="center">
          Please enter your email & password to view your personal account.
        </Text>
      </View>

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
      <Input
        variant="outline"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        // borderColor="white"
      >
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          color="white"
        />
        <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Ionicons name="eye-sharp" size={20} color="white" />
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

      {/* <Alert mx="$2.5" action="error" variant="accent">
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText>Something went wrong. Please try again later.</AlertText>
      </Alert> */}
    </VStack>
  );
};

export default SignInComponent;
