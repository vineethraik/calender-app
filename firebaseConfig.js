import { initializeApp } from "firebase/app";

import {
  browserSessionPersistence,
  Auth,
  getReactNativePersistence,
  initializeAuth,
  Persistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "<api key>",
  authDomain: "calneder-app.firebaseapp.com",
  databaseURL: "https://calneder-app.firebaseio.com",
  projectId: "calneder-app",
  storageBucket: "project-id.appspot.com",
  //   messagingSenderId: "sender-id",
  appId: "<app id>",
  //   measurementId: "G-measurement-id",
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// export const auth = getAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export const auth = initializeAuth(app, {
  persistence: [getReactNativePersistence(ReactNativeAsyncStorage)],
});

// auth.setPersistence(ReactNativeAsyncStorage);

// export default { auth };
