import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

const EventDetailsModal = ({ event, isVisible, onClose }) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = isVisible ? 1 : 0; // Update the scale value when visibility changes
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        scale.value,
                        [0, 1],
                        [0.5, 1], // Start at 50% scale and animate to 100%
                        Extrapolate.CLAMP // Prevent scaling beyond this range
                    ),
                },
            ],
            opacity: scale.value, // Fade in the modal as it scales up
        };
    });

    return (
        <Modal isOpen={isVisible} onClose={onClose}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Text style={styles.backButtonText}>back</Text>
            </TouchableOpacity>
            <Image source={{ uri: 'https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/10/8Z01KJ8v-Footlab-dubai-0.jpg' }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.time}>{event.time}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.location}>{event.location}</Text>
                <Text style={styles.price}>{`Price: ${event.currency}${event.ticketPrice}`}</Text>
            </View>
        </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    backButtonText: {
        fontSize: 18,
        color: '#333',
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        marginVertical: 8,
    },
    time: {
        fontSize: 16,
    },
    date: {
        fontSize: 16,
    },
    location: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EventDetailsModal;
