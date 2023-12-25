import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';

export const getLondonPrayerTimesForToday = () => {
    const londonCoordinates = new Coordinates(51.5074, -0.1278);
    const date = new Date();
    
    let params = CalculationMethod.MuslimWorldLeague(); 
    params.fajrAngle = 15; 
    params.ishaAngle = 15;
    params.highLatitudeAdjustment = 'AngleBased';

    return new PrayerTimes(londonCoordinates, date, params);
};

export const getLondonPrayerTimesForWeek = () => {
    const weekPrayerTimes = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
        weekPrayerTimes.push(getLondonPrayerTimesForToday(date));
    }

    return weekPrayerTimes;
};

export const getLondonPrayerTimesForMonth = () => {
    const monthPrayerTimes = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    while (currentDate.getMonth() === currentMonth) {
        monthPrayerTimes.push(getLondonPrayerTimesForToday(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return monthPrayerTimes;
};
