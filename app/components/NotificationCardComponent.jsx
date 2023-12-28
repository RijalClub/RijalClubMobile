import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useAtom } from 'jotai';
import { notificationsAtom } from '../utils/atoms';

const NotificationCardComponent = ({ notification, id, handlePress }) => {
    const [, setNotifications] = useAtom(notificationsAtom);

    const handleSwipe = () => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(notif => notif.id !== id)
        );
    };

    const rightSwipeActions = () => {
        return (
            <View style={styles.rightAction}>
                <Text style={styles.actionText}>Delete</Text>
            </View>
        );
    };

    return (
        <Swipeable
            renderRightActions={rightSwipeActions}
            onSwipeableOpen={(direction) => {
                // Check the swipe direction if necessary
                if (direction === 'right') {
                    handleSwipe();
                }
            }}
        >
            <Pressable onPress={handlePress}>
            <View containerStyle={styles.card}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
            </View>
            </Pressable>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#555',
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        marginVertical: 5,
        marginRight: 10,
        padding: 20,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
    },
    // ... other styles
});

export default NotificationCardComponent;
