import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import supabase from "../utils/supabaseClient";
import { useAtom } from "jotai";
import { userAtom } from "../utils/atoms";

interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  location: string;
  ticketPrice: number;
  currency: string;
}

interface CheckoutModalScreenProps {
  isVisible: boolean;
  onClose: () => void;
  eventDetails: Event;
}
const CheckoutModalScreen: React.FC<CheckoutModalScreenProps> = ({
  isVisible,
  onClose,
  eventDetails,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const scale = useSharedValue(0);
  const [user] = useAtom(userAtom);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const fetchPaymentSheetParams = async () => {
    const { data, error } = await supabase.functions.invoke("payment-sheet", {
      body: {
        amount: eventDetails.ticketPrice,
        currency: eventDetails.currency,
      },
    });
    if (error) {
      console.error("Error checking user:", error);
      return {};
    }
    const { paymentIntent, ephemeralKey, customer, stripe_pk } = data;
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
      stripe_pk,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const firstName = user?.user_metadata?.first_name ?? "";
    const lastName = user?.user_metadata?.last_name ?? "";
    const fullName = `${firstName} ${lastName}`.trim();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Rijal Club",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      defaultBillingDetails: {
        name: fullName,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error?.code === "Canceled") {
        onClose();
      } else if (error?.code === "Failed") {
        console.error(error);
        onClose();
      }
    } else {
      console.log("success");
      onClose();
    }
  };

  React.useEffect(() => {
    async function initialize() {
      await initializePaymentSheet();
    }
    user && initialize();
    scale.value = isVisible ? withSpring(1) : withSpring(0);
  }, [isVisible, scale]);

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.ScrollView style={[styles.container, animatedStyle]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.eventDetailsRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.thumbnail}
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{eventDetails.title}</Text>
              <Text style={styles.eventPrice}>£{eventDetails.ticketPrice}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={openPaymentSheet}
            style={styles.payNowButton}
          >
            <Text style={styles.payNowText}>Pay Now</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Deep charcoal background
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust as needed for status bar
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: "auto",
  },
  backText: {
    color: "#ADD8E6",
    fontSize: 18,
  },
  eventDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C", // Secondary Background
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  eventInfo: {
    marginLeft: 15,
    flex: 1,
  },
  eventTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  eventPrice: {
    color: "#30D5C8", // Highlight color
    fontSize: 18,
  },
  sectionTitle: {
    color: "#D0D0D0",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressSection: {
    backgroundColor: "#1C1C1C", // Secondary Background
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#7d7979", // Lighter grey for inputs
    color: "#FFFFFF", // White text with slight grey tint
    borderRadius: 4,
    fontSize: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333333", // Slightly lighter border for the input
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20, // Adjust as needed
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#D0D0D0",
    fontSize: 16,
  },
  // ... Other styles for text inputs and checkbox
  payNowButton: {
    backgroundColor: "#1BA098", // Accent color
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  payNowText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutModalScreen;
