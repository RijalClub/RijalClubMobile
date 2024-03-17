import React, { useState, useEffect } from "react";
import { Text, VStack, Box } from "@gluestack-ui/themed";
import { getLondonPrayerTimesForToday } from "../utils/prayerTimes.ts";
import { writeIslamicDate } from "../utils/islamicCalendarConversion";
import { clearTimeout } from "@testing-library/react-native/build/helpers/timers";
import PrayerTimeWidgetComponent from "../components/PrayerTimeWidgetComponent.tsx";
import NotificationPanelComponent from "../components/NotificationPanelComponent";
import Subtitle from "../components/SubtitleComponent";
import Title from "../components/TitleComponent.jsx";
import HeaderComponent from "../components/HeaderComponent";

interface HomeScreenProps {
  navigation: any;
}

type PrayerTimes = {
  fajr: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTimes | null>(
    null
  );
  const [todayIslamicDate, setTodayIslamicDate] = useState<string>("");
  const [currentPrayer, setCurrentPrayer] = useState<string>("");

  useEffect(() => {
    const recalculateTimes = () => {
      const times = getLondonPrayerTimesForToday();
      setTodayPrayerTimes({
        fajr: times.fajr,
        dhuhr: times.dhuhr,
        asr: times.asr,
        maghrib: times.maghrib,
        isha: times.isha,
      });
      setCurrentPrayer(times.currentPrayer());
    };

    const recalculateTimesDate = () => {
      recalculateTimes();
      const todayIslamicDateConverted = writeIslamicDate(-1);
      setTodayIslamicDate(todayIslamicDateConverted);
    };

    recalculateTimesDate();

    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      recalculateTimesDate();
    }, msUntilMidnight);

    const intervalId = setInterval(() => {
      setCurrentPrayer(
        getLondonPrayerTimesForToday().currentPrayer(new Date())
      );
    }, 60000); // every 60 seconds

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <HeaderComponent navigation={navigation} />
      <Box backgroundColor="#121212" flex={1}>
        <VStack space="lg" alignItems="center">
          <Title>Connecting you to your faith and community</Title>
          <Text color="white" fontSize={18} fontStyle="italic">{todayIslamicDate}</Text>
          <PrayerTimeWidgetComponent
            prayerTimes={todayPrayerTimes}
            currentPrayer={currentPrayer}
          />
        </VStack>
        <Subtitle>
          Announcements
        </Subtitle>
        <NotificationPanelComponent />
      </Box>
    </>
  );
};

export default HomeScreen;
