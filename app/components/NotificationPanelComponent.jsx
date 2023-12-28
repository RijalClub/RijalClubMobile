import React, {useEffect, useState} from 'react';
import {UIManager, Platform, LayoutAnimation} from 'react-native';
import NotificationCardComponent from './NotificationCardComponent';
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

    useEffect(() => {
         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [notifications]);

    const handlePress = (notification) => {
        setSelectedNotification(notification);
    };

    return (
        <>
        <ScrollView style={{ flex: 1 }}>
            <VStack space="md">
                {notifications.map(notification => (
                    <View key={notification.id} style={{paddingLeft: 10, paddingRight: 10, borderRadius: 10}}>
                    <NotificationCardComponent
                        notification={notification}
                        id={notification.id}
                        handlePress={()=> handlePress(notification)}
                    />
                    </View>
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
    </>
    );
};
export default NotificationPanelComponent;
