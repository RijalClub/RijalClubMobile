import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Text,
    VStack
} from '@gluestack-ui/themed';
import Subtitle from '../components/SubtitleComponent';
import PrayerTimeWidgetComponent from '../components/PrayerTimeWidgetComponent.tsx';
import { getLondonPrayerTimesForToday } from '../utils/prayerTimes';
import NotificationPanelComponent from "../components/NotificationPanelComponent";
import {writeIslamicDate} from "../utils/islamicCalendarConversion";
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
    const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTimes | null>(null);
    const [todayIslamicDate, setTodayIslamicDate] = useState<string>('');

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
            <HeaderComponent navigation={navigation} />
            <View style={styles.container}>
                <VStack space="lg" alignItems="center">
                    <Subtitle style={styles.subtitleText}>Connecting you to your faith and community</Subtitle>
                    <Subtitle style={styles.subtitleText}>{todayIslamicDate}</Subtitle>
                    <PrayerTimeWidgetComponent prayerTimes={todayPrayerTimes} />
                </VStack>
                <Text style={styles.sectionTitle}>Announcements</Text>
                <NotificationPanelComponent />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212', // Dark background color for the entire screen
        flex: 1,
    },
    titleText: {
        fontSize: 28,
        color: '#FFFFFF',
        marginTop: 20,
        paddingTop: 10
    },
    subtitleText: {
        fontSize: 16,
        color: '#D0D0D0',
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
        color: '#FFFFFF',
        paddingVertical: 10,
        textAlign: 'center'
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