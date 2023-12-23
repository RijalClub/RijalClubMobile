import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { List, Avatar, Modal, Portal, Button, Picker } from 'react-native-paper';
import PositionDropdown from './PositionDropdown';

const EventModal = ({ visible, currentEvent, hideModal }) => {

  const joinEvent = () => {
    console.log("joined");
  };

  const leaveEvent = () => {
    console.log("left match");
  };

  const payEvent = () => {
    console.log("pay for event");
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <Text style={styles.modalTitle}>{currentEvent?.title}</Text>
        <Text>{currentEvent?.description}</Text>
        <Text>Time</Text>
        <Text>Date</Text>
        <Text>Location</Text>
        <Text>Availability 15/28</Text>
        <PositionDropdown />
        <Button onPress={payEvent} mode="contained" style={styles.modalButton}>Pay</Button>
        <Button onPress={joinEvent} mode="contained" style={styles.modalButton}>Join Event</Button>
        <Button onPress={leaveEvent} mode="contained" style={styles.modalButton}>Leave Event</Button>
        <Button onPress={hideModal} mode="contained" style={styles.modalButton}>Close</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 10
  }
});

export default EventModal;