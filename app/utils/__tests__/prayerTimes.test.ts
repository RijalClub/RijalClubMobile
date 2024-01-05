import { getLondonPrayerTimesForToday } from '../prayerTimes.ts';

describe('London Prayer Times Functions', () => {

    it('should calculate prayer times for today in London', () => {
        const prayerTimesToday = getLondonPrayerTimesForToday();
        expect(prayerTimesToday).toBeDefined();
        expect(prayerTimesToday.fajr).toBeDefined();
        expect(prayerTimesToday.dhuhr).toBeDefined();
    });

});
