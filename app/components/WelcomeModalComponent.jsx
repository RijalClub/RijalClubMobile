import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {Pressable, Text, View} from "@gluestack-ui/themed";

const WelcomeModalComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the modal after the splash screen, with some condition or delay
        setTimeout(() => setIsVisible(true), 1000); // Dummy delay for demonstration
    }, []);

    // Animated styles for the modal
    const modalAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isVisible ? 1 : 0, {
            duration: 1500,
            easing: Easing.out(Easing.exp),
        }),
    }));

    // Close modal function
    const closeModal = () => {
        setIsVisible(false);
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <Pressable style={styles.centeredView} onPress={closeModal}>
                <Animated.View style={[styles.modalView, modalAnimatedStyle]}>
                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <MaterialCommunityIcons name="close-circle" size={24} color="#DC143C" />
                    </Pressable>
                    <Text style={styles.titleText}>Welcome</Text>
                    <Text style={styles.modalText}>
                        "In the name of Allah, the Most Gracious, the Most Merciful.
                        Let us take a moment to reflect on the wisdom of the Prophet Muhammad (PBUH),
                        whose compassion and dedication to spreading knowledge has inspired countless hearts.
                        In the early days of Islam, his perseverance in the face of adversity set an example
                        for all Muslims to follow..."
                    </Text>
                    <View style={styles.iconRow}>
                        <FontAwesome5 name="book-open" size={24} color="black" />
                        <MaterialCommunityIcons name="hand-heart" size={24} color="black" />
                        <FontAwesome5 name="kaaba" size={24} color="black" />
                        <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="black" />
                        <FontAwesome5 name="mosque" size={24} color="black" />
                        <FontAwesome name="star" size={24} color="black" />
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,160,122, 0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
});

export default WelcomeModalComponent;
