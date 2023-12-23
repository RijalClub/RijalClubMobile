import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { Box, Text, Icon, HStack } from '@gluestack-ui/themed';
import EventModal from './components/EventModal';
import { CalendarPlus } from 'lucide-react-native'; // Ensure this is compatible with Gluestack UI

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
    }
   ];

  const showModal = (event) => {
    setCurrentEvent(event);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
      <ScrollView>
        {events.map((event) => (
          <Pressable key={event.id} onPress={() => showModal(event)} style={styles.eventPressable}>
            <Box>
              <HStack space='sm'>
                <Icon as={CalendarPlus} size='xl' color='black'/>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  eventPressable: {
    backgroundColor: '#f2ebff',
    // shadowColor: 'black',
    // shadowRadius: 10,
    // elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    marginBottom: 20
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
});

export default FootballScreen;
