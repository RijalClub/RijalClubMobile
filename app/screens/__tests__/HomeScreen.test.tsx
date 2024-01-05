import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

jest.mock("../../utils/prayerTimes.ts", () => ({
  getLondonPrayerTimesForToday: () => ({
    fajr: new Date("2024-01-01T05:00:00"),
    dhuhr: new Date("2024-01-01T12:00:00"),
    asr: new Date("2024-01-01T15:00:00"),
    maghrib: new Date("2024-01-01T18:00:00"),
    isha: new Date("2024-01-01T20:00:00"),
    currentPrayer: jest.fn(() => "fajr"),
  }),
}));

jest.mock("../../utils/islamicCalendarConversion", () => ({
  writeIslamicDate: () => "18 Rajab 1443",
}));

describe("<HomeScreen />", () => {
  let getByText: Function;

  beforeEach(() => {
    const rendered = render(<HomeScreen navigation={mockNavigation} />);
    getByText = rendered.getByText;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(
      getByText("Connecting you to your faith and community"),
    ).toBeDefined();
    expect(getByText("Announcements")).toBeDefined();
  });

  it("should display correct Islamic date", () => {
    expect(getByText("18 Rajab 1443")).toBeDefined();
  });
});
