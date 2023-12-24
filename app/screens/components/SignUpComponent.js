import React, { useState } from 'react';
import { StyleSheet, ScrollView, Platform, Pressable, ActivityIndicator } from 'react-native';
import {
    Button,
    Text,
    Input,
    VStack,
    View,
    InputField,
    ButtonText
} from '@gluestack-ui/themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useAtom } from 'jotai';
import { emailAtom, passwordAtom, userAtom } from '../../utils/atoms';
import supabase from '../../utils/supabaseClient';

const SignUpComponent = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [, setUserSession] = useAtom(userAtom);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signUpError, setSignUpError] = useState(null);

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    };
    
    const handleSignUp = async () => {
        setIsLoading(true);
        setSignUpError(null);
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
            mode: 'date',
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
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up To Rijal Club</Text>
            <Text style={styles.subtitle}>Please enter your details to create an account.</Text>
            <VStack space="md">
                <Text lineHeight="$xs">
                        Email
                    </Text>
                    <Input style={styles.input}>
                        <InputField type="text" value={email} placeholder="Enter your email" onChangeText={setEmail}  placeholderTextColor="#a1a1a1"
                            clearButtonMode="while-editing"/>
                        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
                    </Input>
                <Text lineHeight="$xs">
                    Password
                </Text>
                <Input style={styles.inputContainer}>
    <InputField
        type={showPassword ? "text" : "password"}
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
        placeholder="Password"
        placeholderTextColor="#a1a1a1"
        clearButtonMode="while-editing"
    />
                                <Pressable onPress={handleState}>
        <MaterialCommunityIcons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="grey" // or any color you prefer
        />
                                </Pressable>
                </Input>
                <Text lineHeight="$xs">
                    First Name
                </Text>
                <Input textAlign="center" style={styles.input}>
                    <InputField
                        type="text"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="First Name"
                        placeholderTextColor="#a1a1a1"
                        clearButtonMode="while-editing"
                    />
                    <MaterialCommunityIcons name="account-circle" size={20} color="grey" style={styles.icon} />
                </Input>

                <Text lineHeight="$xs">
                    Surname
                </Text>
                <Input textAlign="center" style={styles.input}>
                    <InputField
                        type="text"
                        value={surname}
                        onChangeText={setSurname}
                        placeholder="Surname"
                        placeholderTextColor="#a1a1a1"
                        clearButtonMode="while-editing"
                    />
                    <MaterialCommunityIcons name="account-circle" size={20} color="grey" style={styles.icon} />
                </Input>
                <View>
                    <Text style={styles.datePickerLabel}>Date of Birth:</Text>
                {Platform.OS === 'android' ? (
                    <Button onPress={openAndroidDatePicker}>
                        <Text> {dateOfBirth.toDateString()}</Text>
                    </Button>
                    ) : (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            display={'default'}
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                        )}
                    </View>
                <Button onPress={handleSignUp}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="gray" />
                        ) : (
                            <ButtonText style={styles.buttonText}>Sign Up</ButtonText>
                            )}
                </Button>
            </VStack>
        </View>
        </ScrollView>
        );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
         borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 50,
        height: 50,
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    datePickerLabel: {
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#0066ff',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
         position: 'absolute',
        right: 15,
        zIndex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingRight: 10,
        paddingLeft: 10,
        height: 50,
    },
    inputField: {
        flex: 1,
        height: '100%',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default SignUpComponent;
