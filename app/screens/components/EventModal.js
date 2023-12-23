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
import { CreditCard, UserPlus, LogOut, XCircle } from 'lucide-react-native';

const EventModal = ({ visible, currentEvent, hideModal }) => {
  const closeButtonRef = useRef(null);

  const joinEvent = () => console.log("Joined");
  const leaveEvent = () => console.log("Left Match");
  const payEvent = () => console.log("Pay for Event");

  return (
    <Modal isOpen={visible} onClose={hideModal} finalFocusRef={closeButtonRef} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
            <Text style={styles.modalTitle}>{currentEvent?.title}</Text>
            <ModalCloseButton onPress={hideModal}>
              <Icon as={XCircle} size="lg" color={'red'} />
            </ModalCloseButton>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Text>{currentEvent?.description}</Text>
          <Text>Time: {currentEvent?.time}</Text>
          <Text>Date: {currentEvent?.date}</Text>
          <Text>Location: {currentEvent?.location}</Text>
          <PositionDropdown />
        </ModalBody>
        <ModalFooter style={styles.modalFooter}>
          <Button onPress={payEvent} variant="primary" style={styles.button}>
            <Icon as={CreditCard} size="md" />
            <Text style={styles.buttonText}>Pay</Text>
          </Button>
          <Button onPress={joinEvent} variant="primary" style={styles.button}>
            <Icon as={UserPlus} size="md" />
            <Text style={styles.buttonText}>Join Event</Text>
          </Button>
          <Button onPress={leaveEvent} variant="primary" style={styles.button}>
            <Icon as={LogOut} size="md" />
            <Text style={styles.buttonText}>Leave Event</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1
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
  }
});

export default EventModal;
