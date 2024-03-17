import React, { useEffect, useState } from "react";
import { UIManager, Platform, LayoutAnimation } from "react-native";
import { ScrollView, VStack, Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { notificationsAtom } from "../utils/atoms";
import NotificationCardComponent from "./NotificationCardComponent";
import NotificationModalComponent from "./NotificationModalComponent";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const NotificationPanelComponent = () => {
  const [notifications] = useAtom(notificationsAtom);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [notifications]);

  const handlePress = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <>
      <ScrollView flex={1}>
        <VStack space="md">
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              paddingLeft={10}
              paddingRight={10}
              borderRadius={10}
            >
              <NotificationCardComponent
                notification={notification}
                id={notification.id}
                handlePress={() => handlePress(notification)}
              />
            </Box>
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
