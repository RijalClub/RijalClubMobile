// ProfileScreen.js
import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {
    Text,
    Input,
    InputField,
    Button,
    ButtonText,
    InputSlot,
    InputIcon,
    EyeIcon,
    EyeOffIcon,
    VStack
} from '@gluestack-ui/themed';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useAtom} from 'jotai';
import supabase from '../utils/supabaseClient';
import {userAtom} from "../utils/atoms";
import {getUserEmail, getUserMetadata} from "../utils/userFunctions";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [userExists, setUserExists] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkedEmail, setCheckedEmail] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [userSession, setUserSession] = useAtom(userAtom);
    const isPasswordMatch = password === confirmPassword;
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };

    const checkUserExists = async () => {
        const lowerCaseEmail = email.toLocaleLowerCase();
        try {
            const response = await fetch(`${supabaseUrl}/functions/v1/listUserByEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Replace with your actual Authorization header
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                },
                body: JSON.stringify({email: lowerCaseEmail}),// Make sure 'email' variable is defined in your component's state
            });

            const {userExists, error} = await response.json();
            if (error) {
                console.error('Error checking user:', error);
                // Handle error appropriately
            } else {
                setUserExists(userExists);
                setCheckedEmail(true);
            }
        } catch (error) {
            console.error('Network error:', error);
            // Handle network error appropriately
        }
    };


    const handleSignUp = async () => {
        const lowerCaseEmail = email.toLocaleLowerCase();
        const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];

        const userMetadata = {
            first_name: firstName,
            surname: surname,
            date_of_birth: formattedDateOfBirth
        };

        const {data, error} = await supabase.auth.signUp({
            lowerCaseEmail,
            password,
            options: {
                data: userMetadata
            }
        });

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            setUserSession(data.user);
            setLoggedIn(true);
        }
    };


    const handleSignIn = async () => {

        const {data, error} = await supabase.auth
            .signInWithPassword({email, password});

        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            setUserSession(data.user);
            setLoggedIn(true);
        }
    };

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            setUserSession(null);
            setLoggedIn(false);
            setUserExists(null);
            setEmail('');
            setPassword('');
            setCheckedEmail(false);
        }
        setUserSession({});
    };

    const formatDateForDatabase = (date) => {
        return date.toISOString().split('T')[0];
    };

    const seeAtom = () => {
        console.log(getUserMetadata(userSession));
        console.log(getUserEmail(userSession));
    }

    const openAndroidDatePicker = () => {
        DateTimePickerAndroid.open({
            value: dateOfBirth,
            mode: 'date',
            onChange: (event, selectedDate) => {
                setDateOfBirth(selectedDate || dateOfBirth);
            },
        });
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {loggedIn ? (<View style={styles.container}>
                <Button onPress={seeAtom}>
                    <ButtonText>
                        see atom
                    </ButtonText>
                </Button>
                <Text>{"\n"}</Text>
                <Button onPress={handleSignOut}>
                    <ButtonText>
                        Log out
                    </ButtonText>
                </Button>
            </View>) : (
                <View style={styles.container}>
                    <VStack space="xs">
                    <Text lineHeight="$xs">
                        Email
                    </Text>
                    <Input>
                        <InputField type="text" value={email} onChangeText={setEmail}/>
                    </Input>
                    {!checkedEmail &&
                        <Button onPress={checkUserExists}>
                            <ButtonText>
                                Enter
                            </ButtonText>
                        </Button>
                    }
                    {(userExists !== null && checkedEmail) && (
                        <>
                            <Text lineHeight="$xs">
                                Password
                            </Text>
                            <Input textAlign="center">
                                <InputField type={showPassword ? "text" : "password"} value={password}
                                            onChangeText={setPassword}/>
                                <InputSlot pr="$3" onPress={handleState}>
                                    <InputIcon
                                        as={showPassword ? EyeIcon : EyeOffIcon}
                                        color="$darkBlue500"
                                    />
                                </InputSlot>
                            </Input>
                            {!userExists && (
                                <>
                                    <Text lineHeight="$xs">
                                        Confirm Password
                                    </Text>
                                    <Input textAlign="center">
                                        <InputField
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                        />
                                        <InputSlot pr="$3" onPress={handleState}>
                                            <InputIcon
                                                as={showPassword ? EyeIcon : EyeOffIcon}
                                                color="$darkBlue500"
                                            />
                                        </InputSlot>
                                    </Input>
                                    <Text lineHeight="$xs">
                                        First Name
                                    </Text>
                                    <Input>
                                        <InputField
                                            type="text"
                                            value={firstName}
                                            onChangeText={setFirstName}
                                            style={styles.input}
                                        />
                                    </Input>

                                    <Text lineHeight="$xs">
                                        Surname
                                    </Text>
                                    <Input>
                                        <InputField
                                            type="text"
                                            value={surname}
                                            onChangeText={setSurname}
                                            style={styles.input}
                                        />
                                    </Input>
                                    <View style={styles.datePickerContainer}>
                                        <Text style={styles.datePickerLabel}>Date of Birth:</Text>
                                        {Platform.OS === 'android' ? (
                                            <Button
                                                onPress={openAndroidDatePicker}>{dateOfBirth ? (dateOfBirth.toDateString()) : ("Select Date")}</Button>
                                        ) : (
                                            <DateTimePicker
                                                value={dateOfBirth}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                                maximumDate={new Date()}
                                            />
                                        )}
                                    </View>

                                    <Button onPress={handleSignUp}>
                                        <ButtonText>
                                            Sign Up
                                        </ButtonText>
                                    </Button>
                                </>
                            )}
                            {userExists && (
                                <Button onPress={handleSignIn}>
                                    <ButtonText>
                                        Sign In
                                    </ButtonText>
                                </Button>
                            )}
                        </>
                    )}
                    </VStack>
                </View>)}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20,
    },
    datePickerLabel: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 10,
    },
    datePicker: {
        flex: 2,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    match: {
        borderBottomColor: 'green',
        borderBottomWidth: 2,
    },
    noMatch: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
});

export default ProfileScreen;