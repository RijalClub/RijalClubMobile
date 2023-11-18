// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import supabase from '../utils/supabaseClient'; // Adjust the import path as necessary
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

    const isPasswordMatch = password === confirmPassword;
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };

    const checkUserExists = async () => {
      try {
          const response = await fetch(`${supabaseUrl}/functions/v1/listUserByEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Replace with your actual Authorization header
              'Authorization': `Bearer ${supabaseAnonKey}`,
          },
            body: JSON.stringify({ email: email }), // Make sure 'email' variable is defined in your component's state
        });
    
        const { userExists, error } = await response.json();
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
        
        const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
        
        const userMetadata = {
            first_name: firstName,
            surname: surname,
            date_of_birth: formattedDateOfBirth
        };
        
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userMetadata
            }
        });

        if (error) {
            console.error('Error signing up:', error.message);
            return;
        }
      
        setLoggedIn(true);
    };
    

    const handleSignIn = async () => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            setLoggedIn(true);
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            setLoggedIn(false);
            setUserExists(null);
            setEmail('');
            setPassword('');
        }
    };
    
    const formatDateForDatabase = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    

    if (loggedIn) {
        return (
            <View style={styles.container}>
                <Text>Logged in</Text>
                <Button mode="contained" onPress={handleSignOut}>
                    Log out
                </Button>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {loggedIn ? (<View style={styles.container}>
                <Text>Logged in</Text>
                <Button mode="contained" onPress={handleSignOut}>
                    Log out
                </Button>
            </View>):( <View style={styles.container}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    mode="outlined"
                    onBlur={checkUserExists}
                />
            {/*    {!checkedEmail &&*/}
            {/*    <Button mode="contained" onPress={checkUserExists}>*/}
            {/*        Enter*/}
            {/*    </Button>*/}
            {/*}*/}
                {(userExists !== null && checkedEmail) && (
                    <>
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={[styles.input, isPasswordMatch ? styles.match : styles.noMatch]}
                        mode="outlined"
                    />
                    {!userExists && (
                        <>
                        <TextInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={[styles.input, isPasswordMatch ? styles.match : styles.noMatch]}
                            mode="outlined"
                        />
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Surname"
                            value={surname}
                            onChangeText={setSurname}
                            style={styles.input}
                            mode="outlined"
                        />
                        <View style={styles.datePickerContainer}>
                            <Text style={styles.datePickerLabel}>Date of Birth:</Text>
                            <DateTimePicker
                                value={dateOfBirth}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        </View>
                        <Button mode="contained" onPress={handleSignUp}>
                            Sign Up
                        </Button>
                        </>
                        )}
                    {userExists && (
                        <Button mode="contained" onPress={handleSignIn}>
                            Sign In
                        </Button>
                        )}
                    </>
                    )}
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