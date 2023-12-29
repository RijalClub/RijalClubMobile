// CheckoutModalScreen.jsx

import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    Keyboard,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useStripe } from '@stripe/stripe-react-native';
import {Checkbox} from '@gluestack-ui/themed';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

const CheckoutModalScreen = ({ isVisible, onClose, eventDetails }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const scale = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    React.useEffect(() => {
        scale.value = isVisible ? withSpring(1) : withSpring(0);
    }, [isVisible, scale]);

    const handlePaymentPress = async () => {
        // const { error } = await presentPaymentSheet({ clientSecret: eventDetails.clientSecret });
        // if (error) {
        //     console.error('Payment failed with error:', error);
        // } else {
        //     console.log('Payment successful');
        //     // Handle successful payment here
        // }
        console.log("payment press")
    };

    // const initializePaymentSheet = async () => {
    //     await initPaymentSheet({
    //         paymentIntentClientSecret: eventDetails.clientSecret,
    //     });
    // };

    //  This should be called when the modal is opened
    // if (isVisible) {
    //     initializePaymentSheet();
    // }

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Animated.ScrollView style={[styles.container, animatedStyle]}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.eventDetailsRow}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.thumbnail} />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{eventDetails.title}</Text>
                        <Text style={styles.eventPrice}>£{eventDetails.ticketPrice}</Text>
                    </View>
                </View>
                <View style={styles.addressSection}>
                <Text style={styles.sectionTitle}>Billing Address</Text>
                <TextInput placeholder="Address Line 1" style={styles.input} />
                <TextInput placeholder="Address Line 2 (Optional)" style={styles.input} />
                <TextInput placeholder="Town or City" style={styles.input} />
                <TextInput placeholder="County (Optional)" style={styles.input} />
                <TextInput placeholder="Postcode" style={styles.input} />
                <View>
                    <Checkbox value={isAddressSaved.toString()}  aria-label="Save this address" onChange={setIsAddressSaved}>
                        <MaterialIcons name={isAddressSaved ? "check-box" : "check-box-outline-blank"} size={24} color="#1BA098" />
                        <Text style={styles.checkboxLabel}>Save this address</Text>
                    </Checkbox>
                </View>
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.payNowButton}>
                    <Text style={styles.payNowText}>Pay Now</Text>
                </TouchableOpacity>
            </Animated.ScrollView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Deep charcoal background
        paddingHorizontal: 20,
        paddingTop: 40, // Adjust as needed for status bar
        marginTop: 20
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 'auto',
    },
    backText: {
        color: '#ADD8E6',
        fontSize: 18,
    },
    eventDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C', // Secondary Background
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    eventInfo: {
        marginLeft: 15,
        flex: 1
    },
    eventTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    eventPrice: {
        color: '#30D5C8', // Highlight color
        fontSize: 18,
    },
    sectionTitle: {
        color: '#D0D0D0',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20
    },
    addressSection: {
        backgroundColor: '#1C1C1C', // Secondary Background
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#7d7979', // Lighter grey for inputs
        color: '#FFFFFF', // White text with slight grey tint
        borderRadius: 4,
        fontSize: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333333', // Slightly lighter border for the input
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 20, // Adjust as needed
    },
    checkboxLabel: {
        marginLeft: 8,
        color: '#D0D0D0',
        fontSize: 16,
    },
    // ... Other styles for text inputs and checkbox
    payNowButton: {
        backgroundColor: '#1BA098', // Accent color
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    payNowText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Add any additional styles you need
});

export default CheckoutModalScreen;
