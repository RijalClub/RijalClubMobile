import React from "react";
import { Text } from "@gluestack-ui/themed";

const Title = ({ children }) => (
  <Text
    fontSize={28}
    fontWeight="bold"
    color="#FCFCFC"
    textAlign="center"
    lineHeight={30}
    textTransform="capitalize"
    py={5}
    px={20}
  >
    {children}
  </Text>
);

export default Title;
