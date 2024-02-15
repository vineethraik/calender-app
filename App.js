import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "./src/service/auth";
import { LoginScreen } from "./src/screens/LoginScreen";
import { ApplicationScreens } from "./src/screens/ApplicationScreens";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log(auth);
  useEffect(() => {
    const x = setInterval(() => {
      // console.log(auth?.currentUser?.phoneNumber, loggedIn);
      updateAuth();
    }, 1000);
    return () => {
      clearInterval(x);
    };
  });

  // onAuthStateChanged(auth, updateAuth);

  const updateAuth = () => {
    setLoggedIn(!!isUserLoggedIn());
  };
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <ApplicationScreens />
      ) : (
        <LoginScreen updateAuth={updateAuth} />
      )}
      {/* <Image
        source={require("./assets/splash.png")}
        style={{ width: 200, height: 200 }}
        onTouchStart={() => {
          signOut(auth);
        }}
      /> */}

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
