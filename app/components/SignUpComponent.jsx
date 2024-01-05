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
  View,
  InputField,
  ButtonText,
  Pressable,
  Icon,
  Center,
  InputIcon,
  InputSlot,
} from "@gluestack-ui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, userAtom } from "../utils/atoms";
import supabase from "../utils/supabaseClient";

const SignUpComponent = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setUserSession] = useAtom(userAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setSignUpError(null);
    const lowerCaseEmail = email.toLocaleLowerCase();
    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

    const userMetadata = {
      first_name: firstName,
      last_name: lastName,
      dob: formattedDateOfBirth,
    };

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
        <VStack space="xl" alignItems="center" px={4}>
          <Text size="xl" bold>
            Sign Up To Rijal Club
          </Text>
          <Text>Please enter your details to create an account.</Text>

          {/* Email Input */}
          <Input
            variant="outline"
            size="sm"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="Email" />
            <InputSlot pr="$3">
              <Ionicons name="mail-outline" size={20} color="gray" />
            </InputSlot>
          </Input>

          {/* Password Input */}
          <Input
            type={showPassword ? "text" : "password"}
            variant="outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            InputRightElement={
              <Button size="xs" onPress={() => setShowPassword(!showPassword)}>
                <ButtonText>{showPassword ? "Hide" : "Show"}</ButtonText>
              </Button>
            }
            size="xl"
          />

          {/* First Name Input */}
          <Input
            variant="outline"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="account-circle" />}
                size="sm"
              />
            }
            size="xl"
          />

          {/* Last Name Input */}
          <Input
            variant="outline"
            placeholder="Surname"
            value={lastName}
            onChangeText={setLastName}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="account-circle" />}
                size="sm"
              />
            }
            size="xl"
          />

          {/* Date of Birth Picker */}
          <Text>Date of Birth:</Text>
          {Platform.OS === "android" ? (
            <Button onPress={openAndroidDatePicker}>
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

          {/* Sign Up Button */}
          <Button onPress={handleSignUp} variant="solid" py={6} px={4}>
            <ButtonText>{isLoading ? "Loading..." : "Sign Up"}</ButtonText>
          </Button>

          {/* Error Message */}
          {signUpError && <Text color="red.500">{signUpError}</Text>}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default SignUpComponent;
