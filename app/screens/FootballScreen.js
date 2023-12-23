//As a user, after signing up, I should be able to express my interest for joining a football session.

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { List, Avatar, Modal, Portal, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FootballScreen = () => {
  const [visible, setVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Champions League Matchday 6',
      description: 'FC Barcelona vs Manchester United',
      time: '8:00 PM',
      date: '2023-12-22',
      location: 'Camp Nou, Barcelona',
      icon: 'soccer'
    },
    {
      id: 2,
      title: 'Premier League: Derby Day',
      description: 'Liverpool vs Everton',
      time: '4:00 PM',
      date: '2023-12-23',
      location: 'Anfield, Liverpool',
      icon: 'soccer'
    },
    {
      id: 3,
      title: 'Serie A Top Clash',
      description: 'Juventus vs Inter Milan',
      time: '9:45 PM',
      date: '2023-12-24',
      location: 'Allianz Stadium, Turin',
      icon: 'soccer'
    },
    {
      id: 4,
      title: 'La Liga: Battle of Giants',
      description: 'Real Madrid vs Atlético Madrid',
      time: '10:30 PM',
      date: '2023-12-25',
      location: 'Santiago Bernabéu, Madrid',
      icon: 'soccer'
    },
    {
      id: 5,
      title: 'Bundesliga Showdown',
      description: 'Bayern Munich vs Borussia Dortmund',
      time: '6:30 PM',
      date: '2023-12-26',
      location: 'Allianz Arena, Munich',
      icon: 'soccer'
    },
    {
      id: 6,
      title: 'Champions League Matchday 6',
      description: 'FC Barcelona vs Manchester United',
      time: '8:00 PM',
      date: '2023-12-22',
      location: 'Camp Nou, Barcelona',
      icon: 'soccer'
    },
    {
      id: 7,
      title: 'Premier League: Derby Day',
      description: 'Liverpool vs Everton',
      time: '4:00 PM',
      date: '2023-12-23',
      location: 'Anfield, Liverpool',
      icon: 'soccer'
    },
    {
      id: 8,
      title: 'Serie A Top Clash',
      description: 'Juventus vs Inter Milan',
      time: '9:45 PM',
      date: '2023-12-24',
      location: 'Allianz Stadium, Turin',
      icon: 'soccer'
    },
    {
      id: 9,
      title: 'La Liga: Battle of Giants',
      description: 'Real Madrid vs Atlético Madrid',
      time: '10:30 PM',
      date: '2023-12-25',
      location: 'Santiago Bernabéu, Madrid',
      icon: 'soccer'
    },
    {
      id: 10,
      title: 'Bundesliga Showdown',
      description: 'Bayern Munich vs Borussia Dortmund',
      time: '6:30 PM',
      date: '2023-12-26',
      location: 'Allianz Arena, Munich',
      icon: 'soccer'
    }
  ];

  const showModal = (event) => {
    setCurrentEvent(event);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const EventModal = () => (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <Text style={styles.modalTitle}>{currentEvent?.title}</Text>
        <Text>{currentEvent?.description}</Text>
        <Text>Time</Text>
        <Text>Date</Text>
        <Text>Location</Text>
        <Button onPress={hideModal}>Close</Button>
      </Modal>
    </Portal>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50, paddingLeft: 20 }}>
      <ScrollView>
        {events.map((event, index) => (
          <List.Item
            key={event.id}
            title={event.title}
            description={event.description}
            left={() => <MaterialCommunityIcons name="soccer" size={26} />}
            onPress={() => showModal(event)}
          />
        ))}
      </ScrollView>
      {currentEvent && <EventModal />}
    </SafeAreaView>
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
});

export default FootballScreen;