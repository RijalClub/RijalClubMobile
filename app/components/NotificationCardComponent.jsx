import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {useDismissGesture} from "../utils/useDismissGesture";

const NotificationCardComponent = ({notification, id, onPress }) => {
    const { translateX, itemHeight, gestureHandler } = useDismissGesture(id);

    const cardStyle = useAnimatedStyle(() => ({
        height: itemHeight.value,
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.card, cardStyle]}>
                <TouchableOpacity style={styles.content} onPress={() => onPress(notification)}>
                    <Text style={styles.title}>{notification.title}</Text>
                    <Text style={styles.message}>{notification.message}</Text>
                </TouchableOpacity>
                <AntDesign name="infocirlceo" size={24} color="black" style={styles.infoIcon} />
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { height: 1, width: 0 },
        elevation: 3,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
        color: '#555',
    },
    infoIcon: {
        padding: 10,
    },
    // Additional styles
});

export default NotificationCardComponent;
