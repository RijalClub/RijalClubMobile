import React, {useState} from 'react';
import { StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Input, VStack, Button, Text, View, InputField, ButtonText } from '@gluestack-ui/themed';
import { useAtom } from 'jotai';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { emailAtom, passwordAtom, userAtom } from '../../utils/atoms'; // Define these atoms as needed
import supabase from '../../utils/supabaseClient';

const SignInComponent = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [, setUserSession] = useAtom(userAtom);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState(null);
    
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    };

    const handleSignIn = async () => {
        setIsLoading(true);
        setSignInError(null);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setUserSession(data.user);
            setIsLoading(false);
        } catch (error) {
            // Handle error, could set an error state and display it
            console.error('Error signing in:', error.message);
            setSignInError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleLabel}>Sign In To Rijal Club</Text>
                <Text style={styles.subtitleLabel}>Please enter your email & password to continue</Text>
            </View>
            <VStack space="md">
                <Text lineHeight="$xs">
                        Email
                    </Text>
                <Input style={styles.input}>
                        <InputField type="text" value={email} onChangeText={setEmail} placeholder="Enter your email"
                            placeholderTextColor="#a1a1a1"
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
                <Button onPress={handleSignIn} style={styles.button}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="gray" />
                    ) : (
                    <ButtonText style={styles.buttonText}>Sign In</ButtonText>
                    )}
                </Button>
                {signInError && <Text style={styles.errorText}>{signInError}</Text>}
            </VStack>
        </View>
        );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 16,
    },
    titleLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitleLabel: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
        fontSize: 16,
        height: 50,
        width: '100%',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#0066ff',
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 8,
        fontSize: 14,
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
});


export default SignInComponent;
