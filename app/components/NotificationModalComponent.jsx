import React from "react";
import { Modal, TouchableOpacity, ScrollView } from "react-native";
import { Text, Box } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

const NotificationModalComponent = ({ notification, isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Box /* overlay background */
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <Box
          backgroundColor="white"
          borderRadius={20}
          padding={20}
          width="90%"
          shadowRadius={10}
          shadowOpacity={0.25}
          elevation={5}
        >
          <TouchableOpacity alignSelf="flex-end" onPress={onClose}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <ScrollView marginVertical={10}>
            <Text fontWeight="bold" fontSize={22} marginBottom={10}>
              {notification.title}
            </Text>
            <Text fontSize={14} color="grey" marginBottom={10}>
              {new Date(notification.timestamp).toLocaleString()}
            </Text>
            <Text fontSize={16} marginBottom={10}>
              {notification.message}
            </Text>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModalComponent;
