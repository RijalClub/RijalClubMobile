import React, {useState} from 'react';
import {StyleSheet, UIManager, Platform} from 'react-native';
import NotificationCardComponent from './NotificationCardComponent'; // Correct path to your component
import NotificationModalComponent from './NotificationModalComponent';
import { ScrollView, VStack, View } from '@gluestack-ui/themed';
import {useAtom} from "jotai";
import {notificationsAtom} from "../utils/atoms";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const NotificationPanelComponent = () => {

    const [notifications, ] = useAtom(notificationsAtom);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handlePress = (notification) => {
        setSelectedNotification(notification);
        console.log(notifications.length);
    };

    return (
        <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
            <VStack spacing={4}>
                {notifications.map(notification => (
                    <NotificationCardComponent
                        key={notification.id}
                        notification={notification}
                        id={notification.id}
                        onPress={()=> handlePress(notification)}
                    />
                ))}
            </VStack>
        </ScrollView>
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
        paddingBottom: 225,
        zIndex: 0
    },
});

export default NotificationPanelComponent;
