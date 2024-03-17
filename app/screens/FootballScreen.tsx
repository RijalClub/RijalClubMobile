import React, { useState } from "react";
import { StatusBar } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import EventsModalScreen from "./EventsModalScreen";
import EventListComponent from "../components/EventListComponent";
import { dummyEventsData } from "../utils/eventsDummyData";
import { FontAwesome } from "@expo/vector-icons";
import { VStack, Text, Box } from "@gluestack-ui/themed";

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

interface FootballScreenProps {
  navigation: any; // Use the correct type for your navigation prop, e.g., NavigationProp
}

const FootballScreen: React.FC<FootballScreenProps> = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const showModal = (event: Event) => {
    setCurrentEvent(event);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const events = dummyEventsData;

  const isEventsArray = Array.isArray(events);

  return (
    <Box flex={1} backgroundColor="#121212">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <HeaderComponent navigation={navigation} />
      {isEventsArray ? (
        <>
          <VStack space="md" paddingHorizontal={16}>
            <Text
              fontSize={30}
              fontWeight="bold"
              color="#D0D0D0"
              mt={20}
              pt={20}
            >
              Football Events
            </Text>
            <Text
              fontSize={16}
              color="#A0A0A0"
              textAlign="left"
              lineHeight={24}
            >
              In North London
            </Text>
            <EventListComponent events={events} onEventPress={showModal} />
          </VStack>
        </>
      ) : (
        <>
          <VStack alignItems="center" justifyContent="center" height={"80%"}>
            <FontAwesome name="calendar" size={100} color="#FEE2E2" />
            <Text
              fontSize={18}
              color="#FEE2E2"
              fontWeight="bold"
              marginTop={20}
            >
              No events available.
            </Text>
          </VStack>
        </>
      )}
      {currentEvent && (
        <EventsModalScreen
          isVisible={visible}
          event={currentEvent}
          hideModal={hideModal}
        />
      )}
    </Box>
  );
};

export default FootballScreen;
