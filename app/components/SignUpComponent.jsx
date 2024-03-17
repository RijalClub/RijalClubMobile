import React, { useState, useCallback } from "react";
import { ScrollView, Platform, ActivityIndicator } from "react-native";
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
  Box,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, userAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";
import AlertDialogErrorComponent from "./AlertDialogErrorComponent";
import validator from "validator";
import { checkedEmailAtom } from "../utils/atoms";

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
  const [errors, setErrors] = useState({
    fieldError: false,
    passwordError: false,
    dobError: false,
    signUpError: null,
  });
  const [errorText, setErrorText] = useState("");
  const [, setCheckedEmail] = useAtom(checkedEmailAtom);

  const clearErrors = () => {
    setErrors({
      fieldError: false,
      passwordError: false,
      dobError: false,
      signUpError: null,
    });
    setErrorText("");
  };

  const dobCheck = () => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age >= 15;
  };

  const handleSignUp = async () => {
    clearErrors();

    // Field Validations
    if (!email || !validator.isEmail(email)) {
      setErrors((prev) => ({ ...prev, fieldError: true }));
      setErrorText(!email ? "Missing email" : "Invalid email format");
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, fieldError: true }));
      setErrorText("Missing password");
      return;
    }
    if (!firstName || !lastName) {
      setErrors((prev) => ({ ...prev, fieldError: true }));
      setErrorText("Missing first name or last name");
      return;
    }
    if (!dobCheck()) {
      setErrors((prev) => ({ ...prev, dobError: true }));
      return;
    }
    if (confirmPassword !== password) {
      setErrors((prev) => ({ ...prev, passwordError: true }));
      return;
    }

    setIsLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase();
      const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

      const userMetadata = {
        first_name: firstName,
        last_name: lastName,
        dob: formattedDateOfBirth,
      };

      const { data, error } = await supabase.auth.signUp({
        email: lowerCaseEmail,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) {
        setErrors((prev) => ({ ...prev, signUpError: error.message }));
        return; // Exit the function if there is an error
      }

      if (data) {
        const user = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();
        setUserSession({ ...data.user, ...user.data });
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setDateOfBirth(new Date());
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
      setErrors((prev) => ({
        ...prev,
        signUpError: "An unexpected error occurred.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const openAndroidDatePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      mode: "date",
      onChange: (_event, selectedDate) => {
        setDateOfBirth(selectedDate || dateOfBirth);
      },
    });
  }, [dateOfBirth]);

  const onChangeDate = (_event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
  };

  return (
    <ScrollView>
      <Center>
        <VStack space="3xl" alignItems="left">
          <Heading size="xl" bold color="white" letterSpacing={"$md"}>
            Sign Up To Rijal Club
          </Heading>
          <Text color="white" fontWeight="bold">
            Please enter your details to create an account.
          </Text>

          {errors.fieldError && (
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
              color="white"
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
              color="white"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye-sharp" size={20} color="white" />
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
              color="white"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye-sharp" size={20} color="white" />
              ) : (
                <Ionicons name="eye-off-sharp" size={20} color="gray" />
              )}
            </InputSlot>
          </Input>

          {errors.passwordError && (
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
              color="white"
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
              color="white"
            />
            <InputSlot pr="$3">
              <Ionicons name="person" size={20} color="gray" />
            </InputSlot>
          </Input>

          {/* Date of Birth Picker */}
          <Box>
            <Text color="white" fontWeight="bold" mb={4}>
              Date of Birth:
            </Text>
            {Platform.OS === "android" ? (
              <Button
                onPress={openAndroidDatePicker}
                size="lg"
                variant="outline"
                action="secondary"
              >
                <Text color="white">{dateOfBirth.toDateString()}</Text>
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
          </Box>

          {errors.dobError && (
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
            <ButtonText fontWeight="$black" letterSpacing={"$xl"}>
              {isLoading ? <ActivityIndicator /> : "Sign Up"}
            </ButtonText>
          </Button>
          <Button size="md" variant="outline" action="secondary">
            <ButtonText color="#FCFCFC">Go Back</ButtonText>
          </Button>

          {/* Error Message */}
          {errors.signUpError && <Text color="red">{errors.signUpError}</Text>}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default React.memo(SignUpComponent);
