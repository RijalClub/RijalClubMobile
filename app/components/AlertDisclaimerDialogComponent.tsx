import React from "react";
import { Modal } from "react-native";
import {
  Text,
  Heading,
  Center,
  Box,
  Button,
  ButtonText,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import application from  "../utils/application.json"

type Props = { showAlertDialog: boolean; hideShowAlertDialog: () => void };

const AlertDisclaimerDialogComponent: React.FC<Props> = ({
  showAlertDialog,
  hideShowAlertDialog,
}) => {
  return (
    <Modal
      visible={showAlertDialog}
      transparent={true}
      onRequestClose={hideShowAlertDialog}
    >
      <Center flex={1}>
        <Box backgroundColor="white" padding={15} marginHorizontal={20}>
          <VStack space="md">
            <Heading size="lg" textAlign="center">
              Disclaimer
            </Heading>
            <Text size="sm">
              {application?.football_events?.disclaimer_text}
            </Text>

            <HStack space={"2xl"} justifyContent="center">
              <Button
                onPress={hideShowAlertDialog}
                action="primary"
                variant="solid"
                isDisabled={false}
                isFocusVisible={false}
                marginTop={10}
                size="md"
                width={150}
              >
                <ButtonText>I understand</ButtonText>
              </Button>
              <Button
                onPress={hideShowAlertDialog}
                action="secondary"
                variant="solid"
                isDisabled={false}
                isFocusVisible={false}
                marginTop={10}
                width={150}
                size="md"
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Modal>
  );
};

export default AlertDisclaimerDialogComponent;
