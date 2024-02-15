import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import { USERS } from "../constants/calender";
import { addEventToCalender } from "../util/calender";

export function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [people, setPeople] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [allday, setAllday] = useState(false);
  const [fromDate, setFromDate] = useState(moment().toDate());
  const [toDate, setToDate] = useState(moment().toDate());

  const peopleList = USERS.filter((user) => user.name.match(people));
  const unselectedPeopleList = peopleList.filter((people) => {
    return selectedPeople.indexOf(people.user_id) < 0;
  });

  // const createEvent =()=>{

  // }

  const addPersonToList = (id) => {
    if (!selectedPeople.includes(id)) {
      setSelectedPeople([...selectedPeople, id]);
    }
  };

  const removePersonFromList = (id) => {
    if (selectedPeople.includes(id)) {
      const updatedData = selectedPeople.filter((index) => index !== id);
      setSelectedPeople(updatedData);
    }
  };

  const onCloseClicked = () => {
    navigation.navigate("Home", { key: moment().format("mm:ss") });
  };

  const onCreateClicked = () => {
    alert("create clicked");
    addEventToCalender({
      onSuccess: () => {
        navigation.navigate("Home", { key: moment().format("mm:ss") });
      },
      details: {
        startDate: moment(fromDate).toDate(),
        endDate: moment(toDate).toDate(),
        title: title,
        attendees: selectedPeople,
        notes: note,
        allDay: allday,
      },
    });
  };

  const pickFromDate = (mode) => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: (event, selectedDate) => {
        setFromDate(selectedDate);
      },
      mode: mode,
      is24Hour: false,
    });
  };
  const pickToDate = (mode) => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: (event, selectedDate) => {
        setToDate(selectedDate);
      },
      mode: mode,
      is24Hour: false,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.action_container}>
        <View
          onTouchEnd={() => {
            onCloseClicked();
          }}
        >
          <Image source={require("./../../assets/x.png")} />
        </View>
        <Text
          style={styles.create_button}
          onPress={() => {
            onCreateClicked();
          }}
        >
          Create
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.title_input}
          placeholder="Add Title"
        />
        <View style={styles.divider} />
        <View style={styles.all_day_container}>
          <Image
            style={styles.all_day_image}
            source={require("./../../assets/clock.png")}
          />
          <Text style={styles.all_day_text}>All Day</Text>
          <Checkbox
            value={allday}
            onValueChange={setAllday}
            style={styles.all_day_checkbox}
          />
        </View>
        <View style={styles.date_picker_container}>
          <View style={styles.date_picker}>
            <Text
              style={styles.date_picker_date}
              onPress={() => {
                pickFromDate("date");
              }}
            >
              {moment(fromDate).format("YYYY-MM-DD")}
            </Text>
            <Text
              style={styles.date_picker_time}
              onPress={() => {
                pickFromDate("time");
              }}
            >
              {moment(fromDate).format("HH:mm A")}
            </Text>
          </View>
          <View style={styles.date_picker}>
            <Image
              style={styles.date_picker_arrow}
              source={require("./../../assets/arrow-down.png")}
            />
            <View />
          </View>
          <View style={styles.date_picker}>
            <Text
              style={styles.date_picker_date}
              onPress={() => {
                pickToDate("date");
              }}
            >
              {moment(toDate).format("YYYY-MM-DD")}
            </Text>
            <Text
              style={styles.date_picker_time}
              onPress={() => {
                pickToDate("time");
              }}
            >
              {moment(toDate).format("HH:mm A")}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.add_note_container}>
          <View style={styles.add_note_header}>
            <Image
              source={require("./../../assets/text-left.png")}
              style={styles.add_note_image}
            />
            <Text style={styles.add_note_text}>Add Note</Text>
          </View>
          <TextInput
            value={note}
            placeholder="Add a Note"
            onChangeText={setNote}
            style={styles.add_note_input}
          />
        </View>
        <View style={styles.add_people_container}>
          <View style={styles.add_people_header}>
            <Image
              source={require("./../../assets/people.png")}
              style={styles.add_people_image}
            />
            <Text style={styles.add_people_text}>Add People</Text>
          </View>
          <TextInput
            value={people}
            onChangeText={setPeople}
            style={styles.add_people_input}
          />
        </View>
        <View style={styles.people_selector}>
          {unselectedPeopleList.map((people) => {
            return (
              <Text
                onTouchEnd={() => {
                  addPersonToList(people.user_id);
                }}
              >
                {people.name}
              </Text>
            );
          })}
        </View>
        <View style={{ ...styles.divider, marginTop: 20 }} />
        <View style={styles.people_selector}>
          {selectedPeople
            .map((i) => {
              return USERS[i];
            })
            .map((people) => {
              return (
                <Text
                  onTouchEnd={() => {
                    removePersonFromList(people.user_id);
                  }}
                >
                  {people.name}
                </Text>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  divider: {
    height: 3,
    backgroundColor: "#aaaaaa",
    marginBottom: 5,
  },
  action_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  close_button_container: {},
  create_button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "blue",
    borderRadius: 50,
    textAlign: "center",
    textAlignVertical: "center",
  },
  form_container: {},
  title_input: {
    fontSize: 30,
    paddingLeft: 20,
  },
  all_day_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  all_day_image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  all_day_text: {
    fontSize: 20,
    flex: 1,
  },
  all_day_checkbox: {
    borderRadius: 50,
  },
  date_picker_container: {
    marginVertical: 20,
  },
  date_picker_arrow: {
    width: 30,
    height: 50,
  },
  date_picker: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  date_picker_time: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
  },
  date_picker_date: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
  },

  add_note_container: { gap: 10 },
  add_people_container: { gap: 10 },

  add_note_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  add_people_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  add_note_image: {
    width: 40,
    height: 40,
  },
  add_people_image: {
    width: 40,
    height: 40,
  },

  add_note_text: {
    fontSize: 25,
  },
  add_people_text: {
    fontSize: 25,
  },

  add_note_input: {
    borderWidth: 1,
    borderColor: "#5555ff",
    borderRadius: 10,
    marginHorizontal: 30,
    height: 100,
    textAlignVertical: "top",
    padding: 10,
  },
  add_people_input: {
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    padding: 3,
    marginHorizontal: 30,
  },
  people_selector: {
    flexDirection: "row",
    gap: 10,
  },
});
