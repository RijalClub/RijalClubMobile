import React from "react";
import { Alert, AlertIcon, AlertText, InfoIcon } from "@gluestack-ui/themed";

type Props = {alertText: string};

const AlertDialogErrorComponent : React.FC<Props> = ({alertText}) => { 
  return (
    <Alert mx="$2.5" action="error" variant="solid">
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText>{alertText}</AlertText>
    </Alert>
  );
};

export default AlertDialogErrorComponent;
