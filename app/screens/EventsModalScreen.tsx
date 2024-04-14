import React, { useRef, useState } from "react";
import { StyleSheet, Modal, TouchableOpacity } from "react-native";
import {
  Center,
  Text,
  Button,
  ButtonText,
  Box,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Calendar from "expo-calendar";
import CheckoutModalScreen from "./CheckoutModalScreen";
import { AntDesign } from "@expo/vector-icons";
import openMap from "react-native-open-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { userAtom } from "../utils/atoms.js";
import { useAtom } from "jotai";
import PlayerListModalComponent from "../components/PlayerListModalComponent.tsx";
import AlertDisclaimerDialogComponent from "../components/AlertDisclaimerDialogComponent.tsx";

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

const playerList = [
  "Harry Smith",
  "Jordan Brown",
  "Liam Jones",
  "Charlie Wilson",
  "Jack Taylor",
  "Oliver Evans",
  "Thomas Clarke",
  "George King",
  "Jacob White",
  "Noah Harris",
  "William Martin",
  "James Thompson",
  "Ethan Carter",
  "Daniel Wright",
  "Oscar Green",
  "Joseph Hall",
  "Henry Young",
  "Daniel Wright",
  "Oscar Green",
  "Joseph Hall",
  "Henry Young",
];
const subList = [
  "Leo Walker",
  "Alexander Edwards",
  "Samuel Hill",
  "Max Mitchell",
  "Dylan Turner",
  "Leo Walker",
  "Alexander Edwards",
  "Samuel Hill",
  "Max Mitchell",
  "Dylan Turner",
];

interface EventsModalScreenProps {
  isVisible: boolean;
  event: Event;
  hideModal: () => void;
}

const EventsModalScreen: React.FC<EventsModalScreenProps> = ({
  isVisible,
  event,
  hideModal,
}) => {
  useRef(null);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [isPlayerListVisible, setPlayerListVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [user] = useAtom(userAtom);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isVisible ? 1 : 0) }],
    };
  });
  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      return true;
    } else {
      alert("Calendar permissions are required to perform this operation");
      return false;
    }
  };

  // const handleAddEventPress = async () => {
  //   const hasPermission = await requestCalendarPermissions();
  //   if (hasPermission) {
  //     // Dummy data for the event
  //     const eventDetails = {
  //       title: "Team Meeting",
  //       startDate: new Date("2023-12-30T09:00:00.000Z"), // Example start date
  //       endDate: new Date("2023-12-30T10:00:00.000Z"), // Example end date
  //       location: "Office",
  //       notes: "Discuss project progress",
  //     };
  //
  //     try {
  //       await addEventToCalendar(eventDetails);
  //       Alert.alert("Success", "Event added to calendar");
  //     } catch (error) {
  //       Alert.alert("Error", "Failed to add event to calendar");
  //     }
  //   } else {
  //     Alert.alert(
  //       "Permission Required",
  //       "This app needs calendar permissions to add events.",
  //     );
  //   }
  // };

  const formatDateAndTime = (
    dateString: string | number | Date,
    timeString: string
  ) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${formattedDate.toUpperCase()} | ${timeString}`;
  };
  const pk = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  return (
    <SafeAreaView>
      <Modal visible={isVisible} transparent={true} onRequestClose={hideModal}>
        <Animated.ScrollView style={[styles.modalContainer, animatedStyle]}>
          <TouchableOpacity style={styles.backButton} onPress={hideModal}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Box>
            <VStack space="4xl">
              <Text style={styles.title}>{event.title.toUpperCase()}</Text>
              <Text style={styles.description}>- {event.description}</Text>

              {/* Event details */}
              <Box style={styles.eventDetails}>
                <VStack space="lg">
                  <Text style={styles.dateTimeLocation}>
                    {formatDateAndTime(event.date, event.time)}
                  </Text>
                  <Text style={styles.location}>
                    {event.location.toUpperCase()}
                  </Text>
                  <Text
                    style={styles.price}
                  >{`PRICE: £${event.ticketPrice}`}</Text>

                  {/* Player list */}
                  <Button onPress={() => setPlayerListVisible(true)}>
                    <ButtonText>See Player List</ButtonText>
                  </Button>
                </VStack>
              </Box>

              <PlayerListModalComponent
                isVisible={isPlayerListVisible}
                playerList={playerList}
                subList={subList}
                hideModal={() => setPlayerListVisible(false)}
              ></PlayerListModalComponent>

              {/* Action buttons */}
              <Box style={styles.buttonRow}>
                {/* Sign Up */}
                <TouchableOpacity
                  style={[styles.button, styles.registerInterestButton]}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Join subs */}
                <TouchableOpacity
                  style={[styles.button, styles.registerInterestButton]}
                  onPress={() => setShowDisclaimer(true)}
                >
                  <Text style={styles.buttonText}>Join Subs</Text>
                </TouchableOpacity>

                {/* Add to calendar */}
                <TouchableOpacity
                  style={[styles.button, styles.addToCalendarButton]}
                >
                  <Text style={styles.buttonText}>Add to Calendar</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.button, styles.openInMapsButton]}
                  onPress={() =>
                    openMap({ latitude: 37.865101, longitude: -119.53833 })
                  }
                >
                  <Text style={styles.buttonText}>Open in Maps</Text>
                </TouchableOpacity> */}
              </Box>

              {/* PAY */}
              <Button
                size="md"
                variant="solid"
                action="positive"
                isDisabled={!user}
                isFocusVisible={false}
                onPress={() => setCheckoutVisible(true)}
              >
                <ButtonText>Pay</ButtonText>
              </Button>
            </VStack>
          </Box>
        </Animated.ScrollView>

        {/* Subs Disclaimer */}
        <AlertDisclaimerDialogComponent
          showAlertDialog={showDisclaimer}
          hideShowAlertDialog={() => setShowDisclaimer(false)}
        />

        {/* Payment Modal Screen */}
        <StripeProvider publishableKey={pk} urlScheme="your-url-scheme">
          <CheckoutModalScreen
            eventDetails={event}
            isVisible={isCheckoutVisible}
            onClose={() => setCheckoutVisible(false)}
          />
        </StripeProvider>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1, // Take up all available space
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  eventDetails: {
    borderColor: "#D0D0D0",
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    marginTop: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: "#333", // Dark text for readability
  },
  image: {
    width: "100%",
    height: 200, // Placeholder for the image
    borderRadius: 10, // Match the border radius from your design
    marginTop: 10, // Add some margin at the top
  },
  title: {
    marginTop: 20,
    fontSize: 23, // Larger for emphasis
    fontWeight: "bold",
    fontStyle: "italic",
    lineHeight: 30,
    textDecorationLine: "underline",
    color: "#D0D0D0", // Dark text for readability
    flexShrink: 1, // Allows text to shrink to fit the container width
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#D0D0D0",
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
    paddingBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#30D5C8", // Highlight Color for important elements
    textAlign: "center",
  },
  addToCalendarButtonText: {
    color: "#D0D0D0",
    fontWeight: "bold",
  },
  // Adjusting the dateTimeLocation style
  dateTimeLocation: {
    flexDirection: "row", // Align date and time on the same line
    justifyContent: "center", // Spread date and time to opposite ends
    fontSize: 20,
    fontWeight: "bold",
    color: "#A0A0A0",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around", // Space out buttons evenly
    alignItems: "center",
    // marginBottom: 20, // Ensure it doesn't stick to the bottom
  },
  // Ensure all buttons have the same flex value to distribute space evenly
  button: {
    flex: 1, // Each button will take up equal space
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the content vertically
    // padding: 10, // Add some padding for better touch area
    marginHorizontal: 5, // Add horizontal margin between buttons
    borderRadius: 5,
    height: 52,
  },
  // Text styles that are common across all buttons
  buttonText: {
    color: "#D0D0D0",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Unique button styles for background colors
  registerInterestButton: {
    backgroundColor: "#F57C00",
  },
  addToCalendarButton: {
    backgroundColor: "#3A7CA5",
  },
  openInMapsButton: {
    backgroundColor: "#76323F",
  },
  payButton: {
    backgroundColor: "#517b41", // A bright, inviting blue
    padding: 10,
    borderRadius: 30, // Rounded edges for modern look
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Utilize the full width
    shadowOpacity: 0.3, // Subtle shadow for depth
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
    textAlign: "center",
  },
});

// async function addEventToCalendar(eventDetails) {
// const defaultCalendarSource = Platform.OS === 'ios'
//   ? await getDefaultCalendarSource()
//   : { isLocalAccount: true, name: 'Expo Calendar' };
//
// const newCalendarID = await Calendar.createCalendarAsync({
//   title: 'Expo Calendar',
//   color: 'blue',
//   entityType: Calendar.EntityTypes.EVENT,
//   sourceId: defaultCalendarSource?.id,
//   source: defaultCalendarSource,
//   name: 'internalCalendarName',
//   ownerAccount: 'personal',
//   accessLevel: Calendar.CalendarAccessLevel.OWNER,
// });
//
// await Calendar.createEventAsync(newCalendarID, {
//   title: eventDetails.title,
//   startDate: eventDetails.startDate,
//   endDate: eventDetails.endDate,
//   location: eventDetails.location,
//   notes: eventDetails.notes,
//   timeZone: 'GMT',
// });
// }
//
// async function getDefaultCalendarSource() {
// const calendars = await Calendar.getCalendarsAsync();
// const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
// return defaultCalendars.length > 0 ? defaultCalendars[0].source : null;
// }

export default EventsModalScreen;
