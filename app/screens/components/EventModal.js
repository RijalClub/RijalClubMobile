import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  Modal,
  Box,
  Button,
  Text,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  ButtonText
} from '@gluestack-ui/themed';
import PositionDropdown from './PositionDropdown';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const EventModal = ({ visible, currentEvent, hideModal }) => {
  const closeButtonRef = useRef(null);

  const joinEvent = () => console.log("Joined");
  const leaveEvent = () => console.log("Left Match");
  const payEvent = () => console.log("Pay for Event");

  return (
    <Modal isOpen={visible} onClose={hideModal} finalFocusRef={closeButtonRef} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Box width="100%" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{currentEvent?.title}</Text>
            <ModalCloseButton onPress={hideModal}>
              <MaterialCommunityIcons name="close-circle" size={24} color="#DC143C" />
            </ModalCloseButton>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Text>{currentEvent?.description}</Text>
          <Text>Time: <Text fontWeight="bold">{currentEvent?.time}</Text></Text>
          <Text>Date: <Text fontWeight="bold">{currentEvent?.date}</Text></Text>
          <Text>Location: <Text fontWeight="bold">{currentEvent?.location}</Text></Text>
          <Box style={styles.postionDropdown}>
            <Text>Position: </Text>
            <PositionDropdown />
          </Box>
        </ModalBody>
        <ModalFooter style={styles.modalFooter}>
          <Button onPress={payEvent} variant="primary" style={[styles.button, styles.payButton]}>
            <FontAwesome name="credit-card" size={21} color="white" />
            <Text style={styles.buttonText}>Pay</Text>
          </Button>
          <Button onPress={joinEvent} variant="primary" style={styles.button}>
            <FontAwesome name="user-plus" size={21} color="white" />
            <Text style={styles.buttonText}>Join</Text>
          </Button>
          <Button onPress={leaveEvent} variant="primary" style={[styles.button, styles.leaveButton]}>
            <MaterialCommunityIcons name="logout-variant" size={21} color="white" />
            <Text style={styles.buttonText}>Leave</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // This ensures vertical alignment
    height: 50, // You can adjust this height as needed
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
 modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  button: {
    flex: 1, // Each button will take equal width
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'center',
  },
  postionDropdown: {
    flexDirection: "row",
    alignItems: "center"
  },
  leaveButton: {
    backgroundColor:"red"
  },
  payButton: {
    backgroundColor: '#4CAF50'
  }
});

export default EventModal;
