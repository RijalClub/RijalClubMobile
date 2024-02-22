import React from "react";
import { Text } from "@gluestack-ui/themed";

const Subtitle = ({ children }) => (
  <Text
    fontSize={22}
    fontWeight="bold"
    textAlign="center"
    color="#FFFFFF"
    marginVertical={20}

  >
    {children}
  </Text>
);

export default Subtitle;
