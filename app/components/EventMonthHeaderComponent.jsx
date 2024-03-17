import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

const EventMonthHeaderComponent = ({ monthYear }) => (
  <Box paddingVertical={10} alignItems="flex-start" justifyContent="center">
    <Text fontSize={18} fontWeight="bold" color="#D0D0D0">
      {monthYear}
    </Text>
  </Box>
);

export default EventMonthHeaderComponent;
