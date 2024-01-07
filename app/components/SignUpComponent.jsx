import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Button,
  Text,
  Input,
  VStack,
  InputField,
  ButtonText,
  Center,
  InputSlot,
  Heading,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
} from "@gluestack-ui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, userAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";
import AlertDialogErrorComponent from "./AlertDialogErrorComponent";

const SignUpComponent = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setUserSession] = useAtom(userAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [missingFieldError, setMissingFieldError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const dobCheck = () => {
    const currentDate = new Date();
    const yearsDifference =
      currentDate.getFullYear() - dateOfBirth.getFullYear();
    if (
      yearsDifference >= 15 ||
      (yearsDifference === 14 &&
        dateOfBirth.getMonth() >= currentDate.getMonth() &&
        dateOfBirth.getDate() >= currentDate.getDate())
    ) {
      return true;
    }
    return false;
  };

  const handleSignUp = async () => {
    if (email === "") {
      setMissingFieldError(true);
      setErrorText("Missing email");
      return;
    }
    if (password === "") {
      setMissingFieldError(true);
      setErrorText("Missing password");
      return;
    }

    if (firstName === "") {
      setMissingFieldError(true);
      setErrorText("Missing first name");
      return;
    }

    if (lastName === "") {
      setMissingFieldError(true);
      setErrorText("Missing last name");
      return;
    }

    setMissingFieldError(false);
    setErrorText("");

    if (!dobCheck) {
      setDobError(true);
    }

    if (confirmPassword !== password) {
      console.log(dateOfBirth);
      setPasswordError(true);
    } else {
      setIsLoading(true);
      setSignUpError(null);
      const lowerCaseEmail = email.toLocaleLowerCase();
      const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

      const userMetadata = {
        first_name: firstName,
        last_name: lastName,
        dob: formattedDateOfBirth,
      };

      console.log(lowerCaseEmail);
      console.log(password);
      console.log(userMetadata);
      const { data, error } = await supabase.auth.signUp({
        lowerCaseEmail,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) {
        console.error("Error signing up:", error.message);
        setSignUpError(error.message);
        setIsLoading(false);
      } else {
        setUserSession(data.user);
        setIsLoading(false);
      }
    }
  };

  const openAndroidDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      mode: "date",
      onChange: (event, selectedDate) => {
        setDateOfBirth(selectedDate || dateOfBirth);
      },
    });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
  };

  return (
    <ScrollView>
      <Center>
        <VStack space="xl" alignItems="left" px={4}>
          <Heading size="xl" bold>
            Sign Up To Rijal Club
          </Heading>
          <Text>Please enter your details to create an account.</Text>

          {missingFieldError && (
            <AlertDialogErrorComponent alertText={errorText} />
          )}

          {/* Email Input */}
          <Input
            variant="outline"
            size="sm"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
            />
            <InputSlot pr="$3">
              <Ionicons name="mail" size={20} color="gray" />
            </InputSlot>
          </Input>

          {/* Password Input */}
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
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye-sharp" size={20} color="gray" />
              ) : (
                <Ionicons name="eye-off-sharp" size={20} color="gray" />
              )}
            </InputSlot>
          </Input>

          {/* Confirm Password Input */}
          <Input
            variant="outline"
            size="sm"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye-sharp" size={20} color="gray" />
              ) : (
                <Ionicons name="eye-off-sharp" size={20} color="gray" />
              )}
            </InputSlot>
          </Input>

          {passwordError && (
            <AlertDialogErrorComponent alertText="Password does not match" />
          )}

          {/* First Name Input */}
          <Input
            variant="outline"
            size="sm"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <InputSlot pr="$3">
              <Ionicons name="person" size={20} color="gray" />
            </InputSlot>
          </Input>

          {/* Last Name Input */}
          <Input
            variant="outline"
            size="sm"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <InputSlot pr="$3">
              <Ionicons name="person" size={20} color="gray" />
            </InputSlot>
          </Input>

          {/* Date of Birth Picker */}
          <Text>Date of Birth:</Text>
          {Platform.OS === "android" ? (
            <Button
              onPress={openAndroidDatePicker}
              size="lg"
              variant="outline"
              action="secondary"
            >
              <Text>{dateOfBirth.toDateString()}</Text>
            </Button>
          ) : (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          {dobError && (
            <AlertDialogErrorComponent
              alertText={"You must be at least 15 years old to sign up"}
            />
          )}

          {/* Sign Up Button */}
          <Button
            onPress={handleSignUp}
            size="md"
            variant="solid"
            action="primary"
          >
            <ButtonText>{isLoading ? "Loading..." : "Sign Up"}</ButtonText>
          </Button>

          {/* Error Message */}
          {signUpError && <Text color="red">{signUpError}</Text>}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default SignUpComponent;
