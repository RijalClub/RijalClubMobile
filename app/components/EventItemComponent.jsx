import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const EventItemComponent = ({ event, onPress }) => (
  <Pressable onPress={onPress} style={styles.eventPressable}>
    <View style={styles.eventDetails}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <View style={styles.eventDateTimeRow}>
        <Text style={styles.eventLine}>{event.date}</Text>
        <Text style={styles.eventLine}>{event.time}</Text>
        <Text style={styles.eventLine}>£{event.ticketPrice}</Text>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  eventPressable: {
    backgroundColor: "#1C1C1C", // Secondary Background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D0D0D0", // Text Color
  },
  eventDescription: {
    fontSize: 14,
    color: "#A0A0A0", // Secondary Text
  },
  eventDateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  eventLine: {
    fontSize: 14,
    color: "#30D5C8",
  },
});

export default EventItemComponent;
