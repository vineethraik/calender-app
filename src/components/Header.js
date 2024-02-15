import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { screenTypes } from "../constants/appScreens";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export function Header({ headerType, clickCallbacks = {}, navigation }) {
  const {
    onFilterClicked,
    onNotificationClicked,
    onHistoryClicked,
    onBackClicked,
  } = clickCallbacks;
  const showFilter = () => {
    return headerType === screenTypes.HOME;
  };
  const showHistory = () => {
    return headerType === screenTypes.HOME;
  };
  const showNotification = () => {
    return headerType === screenTypes.HOME;
  };

  const showBackArrow = () => {
    return (
      headerType === screenTypes.HISTORY ||
      headerType === screenTypes.NOTIFICATION
    );
  };
  return (
    <View style={styles.container}>
      {showBackArrow() && (
        <View
          onTouchEnd={() => {
            onBackClicked ? onTouchEnd() : navigation.navigate("Home");
          }}
        >
          <Image
            style={styles.icons}
            source={require("./../../assets/arrow-left.png")}
          />
        </View>
      )}
      {showFilter() && (
        <View
          onTouchEnd={() => {
            onFilterClicked ? onNotificationClicked() : signOut(auth);
          }}
        >
          <Image
            style={styles.icons}
            source={require("./../../assets/funnel.png")}
          />
        </View>
      )}
      <Text style={styles.header_text}>{headerType}</Text>
      {showNotification() && (
        <View
          onTouchEnd={() => {
            onNotificationClicked
              ? onNotificationClicked()
              : navigation.navigate("Notification");
          }}
        >
          <Image
            style={styles.icons}
            source={require("./../../assets/bell.png")}
          />
        </View>
      )}
      {showHistory() && (
        <View
          onTouchEnd={() => {
            onHistoryClicked
              ? onHistoryClicked()
              : navigation.navigate("History");
          }}
        >
          <Image
            style={styles.icons}
            source={require("./../../assets/clock-history.png")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  header_text: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  icons: {
    width: 30,
    height: 30,
  },
});
