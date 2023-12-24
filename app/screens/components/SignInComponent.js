import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Input, VStack, Button, Text, View, InputField, InputSlot, InputIcon, EyeIcon, EyeOffIcon } from '@gluestack-ui/themed';
import { useAtom } from 'jotai';
import { emailAtom, passwordAtom, userAtom } from '../../utils/atoms'; // Define these atoms as needed
import supabase from '../../utils/supabaseClient';

const SignInComponent = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [, setUserSession] = useAtom(userAtom);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    };

    const handleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setUserSession(data.user);
        } catch (error) {
            // Handle error, could set an error state and display it
            console.error('Error signing in:', error.message);
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
                <Button onPress={handleSignIn} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
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

export default SignInComponent;
