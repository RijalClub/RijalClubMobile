import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  VStack,
  Divider
} from '@gluestack-ui/themed';
import HeaderComponent from '../components/HeaderComponent';
import Title from '../components/TitleComponent';
import Subtitle from '../components/SubtitleComponent';
import PrayerTimeWidgetComponent from '../components/PrayerTimeWidgetComponent';
import { getLondonPrayerTimesForToday } from '../utils/prayerTimes';
import NotificationPanelComponent from "../components/NotificationPanelComponent";
import {writeIslamicDate} from "../utils/islamicCalendarConversion";

const Card = ({ children, style }) => (
  <View style={[styles.cardStyle, style]}>{children}</View>
  );

const HomeScreen = ({ handleBackPress }) => {
  const [todayPrayerTimes, setTodayPrayerTimes] = useState({});
  const [todayIslamicDate, setTodayIslamicDate] = useState('');

  const todayIslamicDateConverted = useMemo(() => writeIslamicDate(-1), []);
  const times = useMemo(() => getLondonPrayerTimesForToday(), []);

  useEffect(() => {
    setTodayPrayerTimes({
      fajr: times.fajr,
      dhuhr: times.dhuhr,
      asr: times.asr,
      maghrib: times.maghrib,
      isha: times.isha,
    });
    setTodayIslamicDate(todayIslamicDateConverted);
    }, [times, todayIslamicDateConverted]);

  return (
    <>
      <HeaderComponent title="Home" onBackPress={handleBackPress} />
      <View style={styles.container}>
        <VStack space={6} alignItems="center">
            <Title style={styles.titleText}>Rijal Club App</Title>
            <Subtitle style={styles.subtitleText}>Connecting you to your faith and community</Subtitle>
            <Subtitle style={styles.subtitleText}>{todayIslamicDate}</Subtitle>
            <PrayerTimeWidgetComponent prayerTimes={todayPrayerTimes} />
        </VStack>
        <Divider my={4} />
        <VStack space={4} px={4}>
          <Text style={styles.sectionTitle}>Rijal Club Announcements</Text>
            <NotificationPanelComponent />
        </VStack>
      </View>
    </>
    );
};

// const dummyNotifications = [
//   { title: '* Urgent: Volunteer Helpers Needed', message: 'We urgently require additional volunteer helpers for the weekend charity event. Please respond if you can participate.', level: 'high' },
//   { title: '* Membership Due', message: 'Your annual membership fee is due. Please make sure to pay by the end of the month.', level: 'medium' },
//   { title: 'Upcoming Event', message: 'Do not forget our meeting next Thursday at the community center.', level: 'low' },
// ];

const styles = StyleSheet.create({
     container: {
        backgroundColor: '#EFEFEF',
       flex: 1
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
    marginTop: 20
  },
    prayerDay: {
        fontSize: 16,
        color: '#333',
    },
  introText: {
      fontSize: 14,
    color: '#555',
    padding: 10,
  },
  sectionTitle: {
      fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 10,
  },
    notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
      elevation: 3,
    },
     notificationTitle: {
    fontWeight: 'bold',
       fontSize: 18,
       color: '#000',
       marginBottom: 4,
     },
  cardStyle: {
      backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    elevation: 4,
    },
  urgentTitle: {
      color: 'red'
    },
  medTitle: {
      color: 'orange'
    }

});

export default HomeScreen;
