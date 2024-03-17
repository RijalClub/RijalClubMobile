import React from "react";
import { View, StyleSheet } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

interface PrayerTimes {
  [key: string]: Date;
}
interface PrayerTimeWidgetComponentProps {
  prayerTimes: PrayerTimes | null;
  currentPrayer: string | null;
}

const formatTime = (date: Date): string => {
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
const PrayerTimeWidgetComponent: React.FC<PrayerTimeWidgetComponentProps> = ({
  prayerTimes,
  currentPrayer,
}) => {
  const lastPrayerCheck = (prayer: string | null) => {
    if (prayer === "none") {
      return "isha";
    }
    return prayer;
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="#333"
      borderRadius={10}
      paddingVertical={15}
      paddingHorizontal={5}
      marginHorizontal={10}
    >
      {prayerTimes &&
        Object.keys(prayerTimes).map((prayer) => {
          const isCurrentPrayer = lastPrayerCheck(currentPrayer) === prayer;
          return (
            <Box key={prayer} alignItems="center" flex={1}>
              <Text
                style={[
                  styles.prayerLabel,
                  isCurrentPrayer && styles.currentPrayerLabel,
                ]}
              >
                {prayer.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.prayerTime,
                  isCurrentPrayer && styles.currentPrayerTime,
                ]}
              >
                {formatTime(prayerTimes[prayer])}
              </Text>
            </Box>
          );
        })}
    </Box>
  );
};

const styles = StyleSheet.create({
  prayerLabel: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "700",
    marginBottom: 3,
  },
  prayerTime: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "700",
  },
  currentPrayerLabel: {
    fontSize: 14,
    color: "#30D5C8",
    fontWeight: "700",
  },
  currentPrayerTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#30D5C8",
  },
});

export default React.memo(PrayerTimeWidgetComponent);
