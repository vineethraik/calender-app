import React, { Fragment, useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Calendar from "expo-calendar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { Header } from "../components/Header";
import { screenTypes } from "../constants/appScreens";
import {
  addEventToCalender,
  getEventsInCalender,
  setupCalender,
} from "../util/calender";
import { CreateEventScreen } from "./CreateEventScreen";

const Stack = createNativeStackNavigator();

export function ApplicationScreens({}) {
  useEffect(() => {
    setupCalender({});
    // (async () => {
    //   addEventToCalender({});
    //   console.log("test", await getEventsInCalender());
    // })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          options={{
            header: (props) => (
              <Header {...props} headerType={screenTypes.HOME} />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{
            header: (props) => (
              <Header {...props} headerType={screenTypes.EVENT} />
            ),
          }}
          name="Event"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{
            header: (props) => (
              <Header {...props} headerType={screenTypes.HISTORY} />
            ),
          }}
          name="History"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{
            header: (props) => (
              <Header {...props} headerType={screenTypes.NOTIFICATION} />
            ),
          }}
          name="Notification"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{
            header: (props) => <View {...props} />,
          }}
          name="Create Event"
          component={CreateEventScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
