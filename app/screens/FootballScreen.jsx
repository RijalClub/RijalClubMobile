import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Box, Text, Icon, HStack, Pressable } from '@gluestack-ui/themed';
import EventModal from '../components/EventModal';
import { FontAwesome } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import Subtitle from '../components/SubtitleComponent';
import Title from '../components/TitleComponent';

const FootballScreen = ({ handleBackPress }) => {
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
    }
   ];

  const showModal = (event) => {
    setCurrentEvent(event);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  return (
    <>
    <HeaderComponent title="Rijal Football" onBackPress={handleBackPress} />
      <Title style={styles.titleText}>About</Title>
      <Subtitle style={styles.subtitleText}>
        Join exhilarating football matches with just a tap, immersing yourself in the thrill of the game through our user-friendly app.
      </Subtitle>
      <ScrollView>
        {events.map((event) => (
          <Pressable key={event.id} onPress={() => showModal(event)} style={styles.eventPressable}>
            <Box>
              <HStack space='sm' style={styles.hStack}>
                <FontAwesome name="calendar-plus-o" size={24} color="#333333" />
                <View>
                  <Text style={styles.modalTitle}>{event.title}</Text>
                  <Text style={styles.modalDescription}>{event.description}</Text>
                </View>
              </HStack>
            </Box>
          </Pressable>
          ))}
      </ScrollView>
      {currentEvent && <EventModal visible={visible} currentEvent={currentEvent} hideModal={hideModal} />}
    </>
    );
};

const styles = StyleSheet.create({
  eventPressable: {
    backgroundColor: '#f2ebff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hStack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 28,
    color: '#000',
    marginTop: 20,
    paddingTop: 10
  },
  subtitleText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
  }
});

export default FootballScreen;
