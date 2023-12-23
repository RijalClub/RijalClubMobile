import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Modal, Portal, Box, Button, Text as GText } from '@gluestack-ui/themed';
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
      <Modal visible={visible} onDismiss={hideModal}>
        <Box style={styles.modal}>
          <GText style={styles.modalTitle}>{currentEvent?.title}</GText>
          <GText>{currentEvent?.description}</GText>
          <GText>Time</GText>
          <GText>Date</GText>
          <GText>Location</GText>
          <GText>Availability 15/28</GText>
          <PositionDropdown />
          <Button onPress={payEvent} variant="primary">Pay</Button>
          <Button onPress={joinEvent} variant="primary">Join Event</Button>
          <Button onPress={leaveEvent} variant="primary">Leave Event</Button>
          <Button onPress={hideModal} variant="secondary">Close</Button>
        </Box>
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
    marginTop: 10,
  },
});

export default EventModal;