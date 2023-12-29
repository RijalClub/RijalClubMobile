import React, { useState } from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import EventModal from '../components/EventModal';
import EventListComponent from "../components/EventListComponent";
import {dummyEventsData} from "../utils/eventsDummyData";
import EventDetailsModal from "../components/EventsDetailModal";

const FootballScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const showModal = (event) => {
    setCurrentEvent(event);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const events = dummyEventsData;

  const isEventsArray = Array.isArray(events);

  return (
      <View style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <HeaderComponent navigation={navigation} />
        {isEventsArray ? (
            <>
              <Text style={styles.titleText}>Football Events</Text>
              <Text style={styles.subtitleText}>
                In North London
              </Text>
              <EventListComponent events={events} onEventPress={showModal} />
            </>
        ) : (
            <Text style={styles.errorText}>No events available.</Text>
        )}
        {currentEvent && (
            <EventModal
                isVisible={visible}
                event={currentEvent}
                hideModal={hideModal}
            />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D0D0D0', // Primary text color on dark background
    marginTop: 20,
    marginBottom: 10, // Adjust as needed
    paddingHorizontal: 16, // Match with your container padding
    textAlign: 'left', // Assuming you want the title centered as per modern design trends
  },
  subtitleText: {
    fontSize: 16,
    color: '#A0A0A0', // Secondary text color for less emphasis
    paddingHorizontal: 16, // Match with your container padding
    textAlign: 'left', // If you want the subtitle centered
    lineHeight: 24, // Adjust line-height for better readability
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default FootballScreen;