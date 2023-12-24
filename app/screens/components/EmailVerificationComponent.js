import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputField, Button, VStack, Text, View, ButtonText } from '@gluestack-ui/themed';
import { useAtom } from 'jotai';
import { emailAtom, checkedEmailAtom, userExistsAtom } from '../../utils/atoms'; // Assuming you have these atoms

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const EmailVerificationComponent = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [checkedEmail, setCheckedEmail] = useAtom(checkedEmailAtom);
    const [userExists, setUserExists] = useAtom(userExistsAtom);
    
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

    return (
        <View style={styles.container}>
            <VStack space="md">
               <Text lineHeight="$xs">
                        Email
                    </Text>
                    <Input>
                        <InputField type="text" value={email} onChangeText={setEmail}/>
                    </Input>
                <Button onPress={() => {
                    checkUserExists();
                }}>
                    <ButtonText> Enter </ButtonText>
                </Button>
            </VStack>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 12,
        borderRadius: 8,
    },
    button: {
        marginTop: 12,
        backgroundColor: '#0066ff',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default EmailVerificationComponent;
