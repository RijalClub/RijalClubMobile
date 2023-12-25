// PrayerTimeWidgetComponent.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const prayerIcons = {
    fajr: 'md-moon',
    dhuhr: 'md-sunny',
    asr: 'md-partly-sunny',
    maghrib: 'md-cloudy',
    isha: 'md-cloudy-night'
};

const PrayerTimeWidgetComponent = ({ prayerTimes }) => {
  const [nextPrayer, setNextPrayer] = useState('');
   
  const formatTime = (date) => {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
    
  const determineNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
  
    let foundNextPrayer = false;
    let nextPrayerName = '';
  
    const prayerTimesInHours = Object.keys(prayerTimes).map((prayerName) => {
      const time = prayerTimes[prayerName];
      return {
        name: prayerName,
        time: time.getHours() + time.getMinutes() / 60
      };
    });
    
    const sortedPrayerTimes = prayerTimesInHours.sort((a, b) => a.time - b.time);
    
    for (let i = 0; i < sortedPrayerTimes.length; i++) {
      if (currentTime < sortedPrayerTimes[i].time) {
        nextPrayerName = sortedPrayerTimes[i].name;
        foundNextPrayer = true;
        break;
      }
    }
  
    if (!foundNextPrayer) {
        nextPrayerName = 'fajr';
    }
  
    setNextPrayer(nextPrayerName);
  };
    
  useEffect(() => {
    determineNextPrayer();
    const interval = setInterval(determineNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <View style={styles.prayerTimeContainer}>
      {Object.keys(prayerTimes).map((prayer) => (
        <View key={prayer} style={styles.prayerTimeBlock}>
          <Ionicons
            name={prayerIcons[prayer]}
            size={30}
            color={nextPrayer === prayer ? 'blue' : '#555'}
            style={styles.prayerIcon}
          />
          <Text style={[styles.prayerLabel, nextPrayer === prayer && styles.nextPrayerLabel,]}>{prayer.toUpperCase()}</Text>
          <Text style={[
            styles.prayerTime,
            nextPrayer === prayer && styles.nextPrayerTime,
            ]}>
              {formatTime(prayerTimes[prayer])}
          </Text>
        </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  prayerTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures even spacing between items
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10, // Adjust margin as needed for screen width
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 3,
  },
  prayerTimeBlock: {
    alignItems: 'center',
    flex: 1, // Each block will take equal space
    marginHorizontal: 5, // Add horizontal margin for spacing
  },
  prayerIcon: {
    marginBottom: 5,
  },
  prayerLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  nextPrayerLabel: {
    fontSize: 12,
    color: 'blue',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  prayerTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5, // Add some space below the time
  },
  nextPrayerTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default PrayerTimeWidgetComponent;