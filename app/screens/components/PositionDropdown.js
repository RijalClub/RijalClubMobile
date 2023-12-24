import React, { useState, useRef } from 'react';
import { Modal, Pressable , StyleSheet } from 'react-native';
import { ChevronDownIcon } from 'lucide-react-native';
import { Icon, View, Text } from '@gluestack-ui/themed';

const PositionDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('No Preference');

  const toggleMenu = () => setVisible(!visible);

  const selectItem = (value) => {
    setSelected(value);
    toggleMenu();
  };

  const positions = ['No Preference', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  return (
    <View>
      <Pressable onPress={toggleMenu}>
        <View style={styles.dropdown}>
          <Text>{selected}</Text>
          {/* Replace ChevronDownIcon with your icon component if available */}
          <Icon as={ChevronDownIcon} size="md" />
        </View>
      </Pressable>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={toggleMenu}
        >
        <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
          <View style={styles.menu}>
            {positions.map((position) => (
              <Pressable key={position} onPress={() => selectItem(position)}>
                <Text style={styles.menuItem}>{position}</Text>
              </Pressable>
              ))}
          </View>
        </Pressable>
      </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  menuItem: {
    padding: 10,
    textAlign: 'center',
  },
});

export default PositionDropdown;
