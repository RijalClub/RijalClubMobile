import React, { useState } from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text, Pressable } from "@gluestack-ui/themed";

const PositionDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("No Preference");

  const toggleMenu = () => setVisible(!visible);

  const selectItem = (value) => {
    setSelected(value);
    toggleMenu();
  };

  const positions = [
    "No Preference",
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Striker",
  ];

  return (
    <Box>
      <Pressable onPress={toggleMenu}>
        <Box flexDirection="row" alignItems="center" padding={10}>
          <Text>{selected}</Text>
          <Ionicons
            name="chevron-down-circle-outline"
            size={24}
            style={{ marginLeft: 8 }}
            color="#333333"
          />
        </Box>
      </Pressable>
      <Modal transparent={true} visible={visible} onRequestClose={toggleMenu}>
        <Pressable
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          onPress={toggleMenu}
        >
          <Box
            backgroundColor="white"
            borderRadius={5}
            padding={10}
            width={200}
          >
            {positions.map((position) => (
              <Pressable key={position} onPress={() => selectItem(position)}>
                <Text padding={10} textAlign="center">
                  {position}
                </Text>
              </Pressable>
            ))}
          </Box>
        </Pressable>
      </Modal>
    </Box>
  );
};

export default PositionDropdown;
