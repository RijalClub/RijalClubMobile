import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Animated } from 'react-native';
import NotificationCardComponent from './NotificationCardComponent'; // Make sure this is the correct path to your component
import NotificationModalComponent from './NotificationModalComponent'; // Correct path required
import { Swipeable } from 'react-native-gesture-handler';

const NotificationPanelComponent = () => {
    const initialNotifications = [
        {
            id: 'n1',
            type: 'user-specific',
            title: 'Appointment Reminder',
            message: 'You have a dental appointment on March 5th at 3:00 PM.',
            timestamp: '2023-03-03T10:00:00Z',
        },
        {
            id: 'n2',
            type: 'general',
            title: 'New Feature Update',
            message: 'Check out our app’s latest features in the newest update.',
            timestamp: '2023-03-02T15:00:00Z',
        },
        {
            id: 'n3',
            type: 'user-specific',
            title: 'Subscription Renewal',
            message: 'Your subscription will expire in 10 days. Renew to continue enjoying our services.',
            timestamp: '2023-03-01T09:00:00Z',
        },
        {
            id: 'n4',
            type: 'general',
            title: 'Scheduled Maintenance',
            message: 'Our service will be temporarily unavailable due to scheduled maintenance on March 6th from 1 AM to 4 AM.',
            timestamp: '2023-02-28T20:00:00Z',
        },
        // ... add more notifications as needed
    ];


    const [notifications, setNotifications] = useState(initialNotifications); // Use your actual data source here
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleDismiss = (id) => {
        // Logic to remove a notification from the list
        setNotifications((currentNotifications) =>
            currentNotifications.filter((notification) => notification.id !== id)
        );
    };

    const handlePress = (notification) => {
        // Logic to handle when a notification is pressed
        setSelectedNotification(notification);
    };

    const renderSwappable = ({ item }) => {
        const rightSwipeActions = (dragX) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            });

            return (
                <Animated.View style={[styles.rightAction, { transform: [{ scale }] }]}>
                    <Text style={styles.actionText}>Delete</Text>
                </Animated.View>
            );
        };

        const handleSwipe = (notificationId) => {
            handleDismiss(notificationId);
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) => rightSwipeActions(dragX)}
                onSwipeableOpen={() => handleSwipe(item.id)}
            >
                <NotificationCardComponent notification={item} onPress={() => handlePress(item)} />
            </Swipeable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderSwappable}
            />
            {selectedNotification && (
                <NotificationModalComponent
                    notification={selectedNotification}
                    isVisible={!!selectedNotification}
                    onClose={() => setSelectedNotification(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    },
    // Additional styles if needed
});

export default NotificationPanelComponent;
