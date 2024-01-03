import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import PrayerTimeWidgetComponent from '../PrayerTimeWidgetComponent';

// Helper function to create mock prayer times
const createMockPrayerTimes = () => ({
    fajr: new Date('2024-01-01T05:00:00'),
    dhuhr: new Date('2024-01-01T12:00:00'),
    asr: new Date('2024-01-01T15:00:00'),
    maghrib: new Date('2024-01-01T18:00:00'),
    isha: new Date('2024-01-01T20:00:00')
});

describe('PrayerTimeWidgetComponent', () => {
    afterEach(cleanup);

    it('renders correctly with valid prayer times', () => {
        const mockPrayerTimes = createMockPrayerTimes();
        const { getByText } = render(<PrayerTimeWidgetComponent prayerTimes={mockPrayerTimes} />);

        Object.entries(mockPrayerTimes).forEach(([prayer, time]) => {
            expect(getByText(prayer.toUpperCase())).toBeDefined();
            expect(getByText(time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0'))).toBeDefined();
        });
    });

    it('displays "Invalid Time" when provided with invalid date objects', () => {
        const invalidPrayerTimes = {
            fajr: 'invalid', // Invalid date
            dhuhr: new Date('2024-01-01T12:00:00'),
            asr: new Date('2024-01-01T15:00:00'),
            maghrib: new Date('2024-01-01T18:00:00'),
            isha: new Date('2024-01-01T20:00:00')
        };
        // @ts-ignore
        const { getByText } = render(<PrayerTimeWidgetComponent prayerTimes={invalidPrayerTimes} />);

        expect(getByText('Invalid Time')).toBeDefined();
    });

    it('renders nothing when prayerTimes is null', () => {
        const { queryByText } = render(<PrayerTimeWidgetComponent prayerTimes={null} />);
        const prayerLabels = ['FAJR', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA'];

        prayerLabels.forEach(label => {
            expect(queryByText(label)).toBeNull();
        });
    });

});

