import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PrayerTimes {
  [key: string]: Date;
}

interface PrayerTimeWidgetComponentProps {
  prayerTimes: PrayerTimes | null;
}

const PrayerTimeWidgetComponent: React.FC<PrayerTimeWidgetComponentProps> = ({ prayerTimes }) => {
  const [nextPrayer, setNextPrayer] = useState<string>('');

  const formatTime = (date: Date): string => {
    if (isNaN(date.getTime())) {
      console.error('Invalid date object passed to formatTime:', date);
      return 'Invalid Time'; // or handle this case as needed
    }
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const determineCurrentPrayer = (): string => {
    if (!prayerTimes) {
      return ''; // or some default value
    }

    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
    let currentPrayer = 'isha';
    const sortedPrayers = Object.entries(prayerTimes)
        .map(([name, time]) => {
          if (isNaN(time.getTime())) {
            return { name, time: Infinity }; // Assign a default time for invalid dates
          }
          return { name, time: time.getHours() + time.getMinutes() / 60 };
        })
        .sort((a, b) => a.time - b.time);

    for (let i = 0; i < sortedPrayers.length; i++) {
      if (currentTime < sortedPrayers[0].time) {
        break;
      }
      if (currentTime >= sortedPrayers[sortedPrayers.length - 1].time) {
        currentPrayer = 'isha';
        break;
      }
      if (currentTime >= sortedPrayers[i].time && currentTime < sortedPrayers[i + 1].time) {
        currentPrayer = sortedPrayers[i].name;
        break;
      }
    }
    return currentPrayer;
  };

  const currentPrayerMemoized = useMemo(determineCurrentPrayer, []);

  useEffect(() => {
    setNextPrayer(currentPrayerMemoized);
    const interval = setInterval(determineCurrentPrayer, 60000);
    return () => clearInterval(interval);
  }, [currentPrayerMemoized, prayerTimes]);

  return (
      <View style={styles.prayerTimeContainer}>
        {prayerTimes && Object.keys(prayerTimes).map((prayer) => (
            <View key={prayer} style={styles.prayerTimeBlock}>
              <Text style={[styles.prayerLabel, nextPrayer === prayer && styles.nextPrayerLabel]}>{prayer.toUpperCase()}</Text>
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
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  prayerTimeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  prayerIcon: {
    marginBottom: 5,
  },
  prayerLabel: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 3,
  },
  nextPrayerLabel: {
    fontSize: 14,
    color: '#30D5C8',
    fontWeight: '700',
  },
  prayerTime: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  nextPrayerTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#30D5C8',
  },
});


export default PrayerTimeWidgetComponent;