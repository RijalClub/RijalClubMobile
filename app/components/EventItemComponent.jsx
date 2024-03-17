import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

const EventItemComponent = ({ event, onPress }) => (
  <Pressable
    backgroundColor="#1C1C1C"
    borderRadius={10}
    padding={15}
    marginBottom={20}
    flexDirection="row"
    alignItems="center"
    onPress={onPress}
  >
    <Box flex={1}>
      <Text fontSize={16} fontWeight="bold" color="#D0D0D0">
        {event.title}
      </Text>
      <Text fontSize={14} color="#A0A0A0">
        {event.description}
      </Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={5}
      >
        <Text fontSize={14} color="#30D5C8">
          {event.date}
        </Text>
        <Text fontSize={14} color="#30D5C8">
          {event.time}
        </Text>
        <Text fontSize={14} color="#30D5C8">
          £{event.ticketPrice}
        </Text>
      </Box>
    </Box>
  </Pressable>
);

export default EventItemComponent;
