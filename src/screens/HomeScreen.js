import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { addEventToCalender, getEventsInCalender } from "../util/calender";
import { WEEK_DAYS } from "../constants/calender";

export function HomeScreen({ navigation, route }) {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState({
    endDate: moment().add(5, "days").toDate(),
    startDate: moment().toDate(),
  });

  useEffect(() => {
    (async () => {
      setEvents(await getEventsInCalender({ ...filterDate }));
      // addEventToCalender({});
    })();
  }, [navigation, route]);

  const onCreateNewClicked = () => {
    navigation.navigate("Create Event");
  };

  return (
    <View key={route?.params?.key} style={styles.container}>
      <View style={styles.add_icon_container} onTouchEnd={onCreateNewClicked}>
        <Image
          style={styles.add_icon}
          source={require("./../../assets/plus-white.png")}
        />
      </View>
      <View style={styles.events_container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.upcoming_bar} />
          <Text style={styles.upcoming}>Upcoming</Text>
        </View>
        {events.map((event) => {
          return (
            <View style={styles.event_container}>
              <View style={styles.date_container}>
                <Text style={styles.week}>{`${
                  WEEK_DAYS[moment(event?.startDate).day()]
                }`}</Text>
                <Text style={styles.date}>{`${moment(
                  event?.startDate
                ).date()}`}</Text>
              </View>
              <View style={styles.data_container}>
                <View style={styles.title_container}>
                  <Text style={styles.title}>{`${event.title}`}</Text>
                  <Text style={styles.time}>{`${moment(event.startDate).format(
                    "hh:mm"
                  )} - ${moment(event.endDate).format("hh:mm A")}`}</Text>
                </View>
                <View style={styles.user_count}>
                  <Image
                    style={styles.user_count_image}
                    source={require("./../../assets/people.png")}
                  />
                  <Text
                    style={styles.user_count_number}
                  >{`${event.attendees?.length}`}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    position: "relative",
  },
  add_icon_container: {
    position: "absolute",
    bottom: 20,
    right: 15,
    zIndex: 1000,
  },
  add_icon: {
    backgroundColor: "blue",
    borderRadius: 50,
  },
  events_container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
  },
  upcoming_bar: {
    width: 5,
    borderRadius: 50,
    backgroundColor: "blue",
    marginRight: 10,
    height: "80%",
  },
  upcoming: {
    fontSize: 40,
    fontWeight: "bold",
  },
  event_container: {
    // flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  date_container: {
    alignItems: "center",
  },
  week: { fontSize: 20 },
  date: { fontSize: 20, borderRadius: 50, padding: 10 },
  data_container: {
    flexGrow: 1,
    // height: 100,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
  title_container: {
    flex: 1,
  },
  title: { fontSize: 30, fontWeight: "bold" },
  time: {},
  user_count: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    gap: 5,
  },
  user_count_image: {
    width: 30,
    height: 30,
  },
  user_count_number: {
    fontSize: 30,
  },
});
