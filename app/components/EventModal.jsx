import React, { useRef } from 'react';
import { StyleSheet, Alert } from 'react-native';
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
  Pressable
} from '@gluestack-ui/themed';
import PositionDropdown from './PositionDropdown';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';
import {CardField, useStripe} from "@stripe/stripe-react-native";

const EventModal = ({ visible, currentEvent, hideModal }) => {
  const closeButtonRef = useRef(null);
  const { confirmPayment } = useStripe();

  const joinEvent = () => console.log("Joined");
  const leaveEvent = () => console.log("Left Match");
  const payEvent = () => console.log("Pay for Event");

  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      return true;
    } else {
      alert('Calendar permissions are required to perform this operation');
      return false;
    }
  }

  const handleAddEventPress = async () => {
    const hasPermission = await requestCalendarPermissions();
    if (hasPermission) {
      // Dummy data for the event
      const eventDetails = {
        title: 'Team Meeting',
        startDate: new Date('2023-12-30T09:00:00.000Z'), // Example start date
        endDate: new Date('2023-12-30T10:00:00.000Z'), // Example end date
        location: 'Office',
        notes: 'Discuss project progress'
      };

      try {
        await addEventToCalendar(eventDetails);
        Alert.alert('Success', 'Event added to calendar');
      } catch (error) {
        Alert.alert('Error', 'Failed to add event to calendar');
      }
    } else {
      Alert.alert("Permission Required", "This app needs calendar permissions to add events.");
    }
  };

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
          <Text style={styles.dateContainer}>Date:{'\u00A0'}
            <Text style={styles.dateText}>{currentEvent?.date}</Text>
            <Pressable onPress={handleAddEventPress}>
              <Text style={styles.addCalendar}>Add To Calendar</Text>
            </Pressable>
          </Text>
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
  },
  dateContainer: {
    display: 'flex'
  },
  addCalendar: {
    marginLeft: 'auto'
  },
  dateText: {
    marginRight: 'auto',
    fontWeight: "bold"
  }
});
async function addEventToCalendar(eventDetails) {
const defaultCalendarSource = Platform.OS === 'ios'
  ? await getDefaultCalendarSource()
  : { isLocalAccount: true, name: 'Expo Calendar' };

const newCalendarID = await Calendar.createCalendarAsync({
  title: 'Expo Calendar',
  color: 'blue',
  entityType: Calendar.EntityTypes.EVENT,
  sourceId: defaultCalendarSource?.id,
  source: defaultCalendarSource,
  name: 'internalCalendarName',
  ownerAccount: 'personal',
  accessLevel: Calendar.CalendarAccessLevel.OWNER,
});

await Calendar.createEventAsync(newCalendarID, {
  title: eventDetails.title,
  startDate: eventDetails.startDate,
  endDate: eventDetails.endDate,
  location: eventDetails.location,
  notes: eventDetails.notes,
  timeZone: 'GMT',
});
}

async function getDefaultCalendarSource() {
const calendars = await Calendar.getCalendarsAsync();
const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
return defaultCalendars.length > 0 ? defaultCalendars[0].source : null;
}

export default EventModal;
