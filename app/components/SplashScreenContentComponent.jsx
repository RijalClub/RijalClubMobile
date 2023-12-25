import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Text, Image, View } from '@gluestack-ui/themed';

const SplashScreenContentComponent = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const logoAnim = useRef(new Animated.Value(0)).current;
    const translateXAnim = useRef(new Animated.Value(-100)).current; // Initial value for translateX: -100

    useEffect(() => {
        // Sequence of animations
        Animated.sequence([
            // Fade in the logo and text
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500, // Adjusted to 1 second for uniformity
                    useNativeDriver: true,
                }),
                Animated.timing(logoAnim, {
                    toValue: 1,
                    duration: 3500, // Longer duration for logo fade in
                    useNativeDriver: true,
                }),
                // Faster fade out for the logo
                Animated.timing(translateXAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                ]),
            // Pause for a moment
            Animated.delay(1000),
            // Fade out before navigating to the next screen
            Animated.timing(logoAnim, {
                ttoValue: 0,
                duration: 1000, // Adjusted to 1 second for uniformity
                useNativeDriver: true,
            }),
            
            Animated.timing(fadeAnim, {
                ttoValue: 0,
                duration: 2500, // Adjusted to 1 second for uniformity
                useNativeDriver: true,
            }),
            ]).start(); // Start the animation
    }, [fadeAnim, translateXAnim, logoAnim]);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black', // Changed to backgroundColor for Animated.View
                padding: 24, // Adjust padding as needed
                opacity: fadeAnim, // Apply fade animation
        }}
            >
            <Animated.Image
                source={require('../../assets/logo.png')}
                alt="Logo"
                resizeMode="contain"
                style={{
                height: '50%',
                    marginBottom: 4,
                    opacity: logoAnim,
                }}
            />
            <Animated.Text
                style={{
                fontSize: 24,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: 2,
                    opacity: fadeAnim,
                    transform: [{ translateX: translateXAnim }],
                }}
                >
                Welcome
            </Animated.Text>
            <Animated.Text
                style={{
                fontSize: 16,
                    color: '#FFFFFF',
                    opacity: fadeAnim,
                    transform: [{ translateX: translateXAnim }],
                }}
                >
                May peace be upon you
            </Animated.Text>
        </Animated.View>
        );
};

export default SplashScreenContentComponent;
