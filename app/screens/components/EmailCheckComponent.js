import React, {useState} from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Input, InputField, Button, VStack, Text, View, ButtonText } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { emailAtom, checkedEmailAtom, userExistsAtom } from '../../utils/atoms';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const EmailCheckComponent= () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [isChecking, setIsChecking] = useState(false);
    const [error, setError] = useState(null);
    const [checkedEmail, setCheckedEmail] = useAtom(checkedEmailAtom);
    const [userExists, setUserExists] = useAtom(userExistsAtom);
    
    const checkUserExists = async () => {
        const lowerCaseEmail = email.toLocaleLowerCase();
        setIsChecking(true);
        setError(null);
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
            setIsChecking(false);
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please try again.');
            setIsChecking(false);
        }
    };

   return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleLabel}>Verify Your Account</Text>
                <Text style={styles.subtitleLabel}>Please enter your email to continue</Text>
            </View>
            <VStack space={4} alignItems="center">
                <Text style={styles.title}>Email</Text>
                <Input style={styles.input}>
                    <InputField
                        type="text"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor="#a1a1a1"
                        clearButtonMode="while-editing"
                    />
                    <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
                </Input>
                <Button style={styles.button} onPress={checkUserExists}>
                    {isChecking ? (
                        <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <ButtonText>Enter</ButtonText>
                            )}
                </Button>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </VStack>
        </View>
        );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 16, // Adds more space above the input field
    },
    titleLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Centers the title text
        marginBottom: 4, // Space between title and subtitle
    },
    subtitleLabel: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666', // Subtitle in a lighter color for distinction
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start', // Aligns title to the left
        marginLeft: 12, // Aligns with the input text
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 15, // Adjust padding for better text alignment
        paddingRight: 50, // Adjust padding to prevent text overlap with icon
        height: 50, // Standard touch target size
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Match the parent width
    },
    icon: {
        position: 'absolute',
        right: 15,
        zIndex: 1, // Ensures the icon is above the input field
    },
    button: {
        marginTop: 18,
        backgroundColor: '#0066ff',
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center', // Centers the button text vertically
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
       color: 'white',
        fontSize: 18, // Adjust font size as needed
        fontWeight: 'bold', // Make the text bold
        textAlign: 'center', // Ensure text is centered
        width: '100%', // Ensure text spans the full width of the button
    },
    errorText: {
        color: 'red',
        marginTop: 8,
        textAlign: 'center', // Centers the error message
        fontSize: 14, // Slightly smaller font size for error text
    },
});


export default EmailCheckComponent;
