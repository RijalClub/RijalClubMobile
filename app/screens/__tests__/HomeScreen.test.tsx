import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
};

jest.mock('../../utils/prayerTimes', () => ({
    getLondonPrayerTimesForToday: () => ({
        fajr: "5:00",
        dhuhr: "12:00",
        asr: "15:00",
        maghrib: "18:00",
        isha: "20:00",
    }),
}));

jest.mock('../../utils/islamicCalendarConversion', () => ({
    writeIslamicDate: () => "18 Rajab 1443",
}));

describe('<HomeScreen />', () => {

    let getByText: Function;

    beforeEach(() => {
        const rendered = render(<HomeScreen navigation={mockNavigation} />);
        getByText = rendered.getByText;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
        expect(getByText('Connecting you to your faith and community')).toBeDefined();
        expect(getByText('Announcements')).toBeDefined();
    });

    it('should display correct Islamic date', () => {
        expect(getByText('18 Rajab 1443')).toBeDefined();
    });

});