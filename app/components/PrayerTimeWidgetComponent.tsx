import React from "react";
import { Text, View, StyleSheet } from "react-native";

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
    <View style={styles.prayerTimeContainer}>
      {prayerTimes &&
        Object.keys(prayerTimes).map((prayer) => {
          const isCurrentPrayer = lastPrayerCheck(currentPrayer) === prayer;
          return (
            <View key={prayer} style={styles.prayerTimeBlock}>
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
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  prayerTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  prayerTimeBlock: {
    alignItems: "center",
    flex: 1,
  },
  prayerIcon: {
    marginBottom: 5,
  },
  prayerLabel: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "700",
    marginBottom: 3,
  },
  currentPrayerLabel: {
    fontSize: 14,
    color: "#30D5C8",
    fontWeight: "700",
  },
  prayerTime: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "700",
  },
  currentPrayerTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#30D5C8",
  },
});

export default React.memo(PrayerTimeWidgetComponent);
