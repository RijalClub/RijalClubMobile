import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useAtom } from 'jotai';
import { notificationsAtom } from '../utils/atoms';
import {HStack} from "@gluestack-ui/themed";

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
                if (direction === 'right') {
                    handleSwipe();
                }
            }}
        >
            <Pressable onPress={handlePress}>
            <View containerStyle={styles.card}>
                <Image
                    source={require('../../assets/notificationcard.png')}
                    style={styles.cardBackgroundImage}
                    resizeMode="cover"
                />
                <HStack>
                    <View style={styles.thumbnailContainer}>
                    <Image
                        source={require('../../assets/thumbnailstock.png')}
                        style={styles.thumbnail}
                    />
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.title}>{notification.title}</Text>
                        <Text style={styles.message}  numberOfLines={2}
                              ellipsizeMode="tail">{notification.message}</Text>
                    </View>
                </HStack>
            </View>
            </Pressable>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardBackgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    thumbnailContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textContent: {
        flex: 1,
        marginLeft: 10,
        marginRight: 5
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    message: {
        fontSize: 14,
        color: '#DDDDDD',
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        marginRight: 16,
        padding: 20,
        color: '#FFF',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
    },

});

export default NotificationCardComponent;
