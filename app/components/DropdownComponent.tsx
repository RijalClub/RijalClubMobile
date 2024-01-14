import React from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

type OptionType = {
  name: string;
  value: string;
  id: string | number;
};

type DropdownProps = {
  options: OptionType[];
  setDropdownValue: (selectedOption: String) => void;
  placeHolderText: string;
  selected?: string;
};

const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  setDropdownValue,
  placeHolderText,
  selected,
}) => {
  return (
    <Select
      onValueChange={(selectedValue) => setDropdownValue(selectedValue)}
      selectedLabel={selected}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder={placeHolderText} style={{ color: "white" }} />
        <AntDesign
          name="caretdown"
          size={15}
          color="white"
          style={{ marginRight: 10 }}
        />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map((option) => (
            <SelectItem
              label={option.name}
              value={option.value}
              key={option.id}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default DropdownComponent;
