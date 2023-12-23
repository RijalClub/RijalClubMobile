import React, { useState } from 'react';
import { Modal, Portal, Text, Button, Provider, Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PositionDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('No Preference');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectItem = (value) => {
    setSelected(value);
    closeMenu();
  };

  const positions = ['No Preference', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>{selected} <MaterialCommunityIcons name="chevron-down" size={24} /></Button>}
    >
      {positions.map(position => (
        <Menu.Item key={position} onPress={() => selectItem(position)} title={position} />
      ))}
    </Menu>
  );
};

export default PositionDropdown;