import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Menu, MenuItem, Box, Text as GText, Icon, Button } from '@gluestack-ui/themed';
import { ChevronDownIcon } from 'lucide-react-native'; // Assuming a ChevronDownIcon exists

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
    <Box>
      <Pressable onPress={openMenu}>
        <Box flexDirection="row" alignItems="center">
          <GText>{selected}</GText>
          <Icon as={ChevronDownIcon} size={24} />
        </Box>
      </Pressable>
      <Menu visible={visible} onDismiss={closeMenu} anchor={{}}>
        {positions.map((position) => (
          <MenuItem key={position} onPress={() => selectItem(position)}>
            {position}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default PositionDropdown;