import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Box,
  Text,
  VStack,
  Avatar,
  Divider,
  AvatarFallbackText,
  AvatarImage,
  View
} from '@gluestack-ui/themed';
import HeaderComponent from './components/HeaderComponent';

const Title = ({ children, style }) => (
  <Text style={[styles.titleStyle, style]}>{children}</Text>
  );

// Subtitle Component
const Subtitle = ({ children, style }) => (
  <Text style={[styles.subtitleStyle, style]}>{children}</Text>
  );

const Card = ({ children, style }) => (
  <View style={[styles.cardStyle, style]}>{children}</View>
  );



const HomeScreen = ({ handleBackPress }) => {
  return (
    <>
      <HeaderComponent title="Home" onBackPress={handleBackPress} />
      <ScrollView style={styles.container}>
        <VStack space={6} alignItems="center">
          <Avatar size="xl">
            <AvatarImage
              source={require('../../assets/logo.png')}
              alt={"Rijal Logo"}
            />
            <AvatarFallbackText>Initials</AvatarFallbackText>
          </Avatar>
          <Title style={styles.titleText}>Rijal Club App</Title>
          <Subtitle style={styles.subtitleText}>Connecting you to your faith and community</Subtitle>
        </VStack>

        <Box backgroundColor="rgba(255, 255, 255, 0.85)" padding={4} marginX={4} marginTop={6} borderRadius={10}>
          <Text style={styles.introText}>
          "In the name of Allah, the Most Gracious, the Most Merciful.
                Let us take a moment to reflect on the wisdom of the Prophet Muhammad (PBUH),
                whose compassion and dedication to spreading knowledge has inspired countless hearts.
                In the early days of Islam, his perseverance in the face of adversity set an example
                for all Muslims to follow..."
          </Text>
        </Box>

        <Divider my={4} />

        <VStack space={4} px={4}>
          <Text style={styles.sectionTitle}>Rijal Club Announcements</Text>
          {dummyNotifications.map((notification, index) => (
            <Card key={index} style={styles.notificationCard}>
              <Text style={[styles.notificationTitle, notification.level !== 'low' && (notification.level === 'high' ? styles.urgentTitle : styles.medTitle)]}>{notification.title}</Text>
                <Text>{notification.message}</Text>
            </Card>
            ))}
        </VStack>
      </ScrollView>
    </>
    );
};

const dummyNotifications = [
  { title: '* Urgent: Volunteer Helpers Needed', message: 'We urgently require additional volunteer helpers for the weekend charity event. Please respond if you can participate.', level: 'high' },
  { title: '* Membership Due', message: 'Your annual membership fee is due. Please make sure to pay by the end of the month.', level: 'medium' },
  { title: 'Upcoming Event', message: 'Do not forget our meeting next Thursday at the community center.', level: 'low' },
];

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
    marginVertical: 20,
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
  titleStyle: {
      fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleStyle: {
      fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
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
