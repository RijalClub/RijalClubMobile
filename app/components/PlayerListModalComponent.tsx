import React from "react";
import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Box } from "@gluestack-ui/themed";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  location: string;
  ticketPrice: number;
  currency: string;
}

interface PlayerListModalProps {
  isVisible: boolean;
  playerList: string[];
  subList: string[];
  hideModal: () => void;
}

const PlayerListModalComponent: React.FC<PlayerListModalProps> = ({
  isVisible,
  playerList,
  subList,
  hideModal,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isVisible ? 1 : 0) }],
    };
  });
  return (
    <SafeAreaView>
      <Modal visible={isVisible} transparent={true} onRequestClose={hideModal}>
        <Animated.ScrollView style={[styles.modalBackground, animatedStyle]}>
          {/* Back button */}
          <TouchableOpacity onPress={hideModal}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Box alignItems="center">
            <Text fontSize={"$2xl"} paddingVertical={10} marginTop={10} color="white" fontWeight="bold" underline={true}>Players</Text>
            {playerList.map((name) => (
              <Text color="white">- {name}</Text>
            ))}
            <Text fontSize={"$2xl"} paddingVertical={10} marginTop={10} color="white" fontWeight="bold" underline={true}>Subs</Text>
            {subList.map((name) => (
              <Text color="white">- {name}</Text>
            ))}
          </Box>
        </Animated.ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#121212",
    padding: 20,
    marginTop: 20
  }
})

export default PlayerListModalComponent;
