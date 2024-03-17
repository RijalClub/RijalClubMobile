import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text, Box, Image } from "@gluestack-ui/themed";
import { Swipeable } from "react-native-gesture-handler";
import { useAtom } from "jotai";
import { notificationsAtom } from "../utils/atoms";

const NotificationCardComponent = ({ notification, id, handlePress }) => {
  const [, setNotifications] = useAtom(notificationsAtom);

  const handleSwipe = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notif) => notif.id !== id)
    );
  };

  const leftSwipeActions = () => {
    return (
      <Box
        backgroundColor="red"
        justifyContent="center"
        alignItems="flex-end"
        flex={1}
        borderTopRightRadius={6}
        borderBottomRightRadius={6}
        marginRight={16}
        padding={20}
        color="#FFF"
      >
        <Text color="white" fontWeight="600">
          Delete
        </Text>
      </Box>
    );
  };

  return (
    <Swipeable
      renderRightActions={leftSwipeActions}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          handleSwipe();
        }
      }}
    >
      <Pressable onPress={handlePress}>
        <Box
          backgroundColor="rgba(0, 0, 0, 0.7)"
          borderRadius={8}
          marginHorizontal={5}
          marginVertical={0}
          overflow="hidden"
        >
          <Image
            source={require("../../assets/notificationcard.png")}
            style={styles.cardBackgroundImage}
            resizeMode="cover"
            alt="card background"
          />
          <Box flex={1} marginLeft={10} marginRight={5}>
            <Text
              fontSize={16}
              fontWeight="bold"
              color="#FFFFFF"
              textAlign="center"
            >
              {notification.title}
            </Text>
            <Text
              fontSize={14}
              fontWeight="bold"
              textAlign="center"
              color="#DDDDDD"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {notification.message}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardBackgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  }
});

export default NotificationCardComponent;
