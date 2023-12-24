import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
    Button,
    ButtonText,
    Text,
    Input,
    VStack,
    View,
    InputField, InputSlot, InputIcon, EyeIcon, EyeOffIcon
} from '@gluestack-ui/themed';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useAtom } from 'jotai';
import { emailAtom, passwordAtom, userAtom} from '../../utils/atoms'; // Define these atoms as needed
import supabase from '../../utils/supabaseClient';

const SignUpComponent = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [, setUserSession] = useAtom(userAtom);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showPassword, setShowPassword] = useState(false);

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
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
        <View style={styles.container}>
            <VStack space="md">
                <Text lineHeight="$xs">
                        Email
                    </Text>
                    <Input>
                        <InputField type="text" value={email} onChangeText={setEmail}/>
                    </Input>
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
                <Text lineHeight="$xs">
                    First Name
                </Text>
                <Input textAlign="center">
                    <InputField
                        type="text"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </Input>

                <Text lineHeight="$xs">
                    Surname
                </Text>
                <Input textAlign="center">
                    <InputField
                        type="text"
                        value={surname}
                        onChangeText={setSurname}
                    />
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
                    <ButtonText>
                    Sign Up
                    </ButtonText>
                </Button>
            </VStack>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0066ff',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default SignUpComponent;
