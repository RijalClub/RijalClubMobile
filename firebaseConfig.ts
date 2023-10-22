import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAb2Kyqt1PiF4Wps6gNwuSgRFcygMpT-W8",
  authDomain: "rijalclubmobile.firebaseapp.com",
  projectId: "rijalclubmobile",
  storageBucket: "rijalclubmobile.appspot.com",
  messagingSenderId: "44376872459",
  appId: "1:44376872459:web:0d51baa13c79371b8c990e",
  measurementId: "G-R8X3FPZ0BZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// const analytics = getAnalytics(app);

export { auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
