// PrayerTimeWidgetComponent.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5, // Reduce padding if needed
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 3,
  },
  prayerTimeBlock: {
    alignItems: 'center',
    flex: 1, // Each block will take equal space
    marginHorizontal: 2, // Reduced horizontal margin for more space
  },
  prayerIcon: {
    marginBottom: 5,
  },
  prayerLabel: {
    fontSize: 11, // Slightly reduced font size
    color: '#555',
    marginBottom: 3, // Reduced space below label
  },
  nextPrayerLabel: {
    fontSize: 11, // Ensure consistent font size
    color: 'blue',
    fontWeight: 'bold',
  },
  prayerTime: {
    fontSize: 12, // Slightly reduced font size
    color: '#555',
  },
  nextPrayerTime: {
    fontSize: 12, // Ensure consistent font size
    fontWeight: 'bold',
    color: 'blue',
  },
});


export default PrayerTimeWidgetComponent;