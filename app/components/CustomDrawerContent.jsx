import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  const { state, navigation } = props;
  const activeRouteName = state.routeNames[state.index];

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      {state.routes.map((route, index) => {
        if (route.name === "Profile") {
          return null;
        }
        const isFocused = activeRouteName === route.name;
        const label =
          props.descriptors[route.key].options.title !== undefined
            ? props.descriptors[route.key].options.title
            : route.name;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.item}
            onPress={() => navigation.navigate(route.name)}
          >
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  item: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  activeLabel: {
    color: "#30D5C8",
  },
});

export default CustomDrawerContent;
