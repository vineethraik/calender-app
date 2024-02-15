import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Calendar from "expo-calendar";
import {
  CALENDER_TITLE,
  USERS,
  USER_ATTENDING_STATES,
} from "../constants/calender";
import moment from "moment";

export const setupCalender = ({
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  (async () => {
    if (await hasCalenderPermission()) {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      //   Calendar.deleteCalendarAsync("25");

      if (!calendars.find((calendar) => calendar.title === CALENDER_TITLE)) {
        console.log(
          await Calendar.createCalendarAsync({
            name: CALENDER_TITLE,
            title: CALENDER_TITLE,
            isPrimary: false,
            isSynced: false,
            isVisible: true,
            color: "#aabbcc",
            accessLevel: "owner",
            ownerAccount: "owner_account_local",
            source: {
              isLocalAccount: true,
              name: "account_name_local",
              type: "LOCAL",
            },
          })
        );
      }
    }
  })();
};

export const hasCalenderPermission = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === "granted";
};

export const getCalenderID = async () => {
  const calenders = await getCalenders();
  return calenders.find((calendar) => calendar.title === CALENDER_TITLE)?.id;
};

export const getCalenders = async () => {
  return await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
};

export const getEventsInCalender = async ({
  onSuccess = () => {},
  onFailure = () => {},
  startDate = moment("2024-02-01T12:35").toDate(),
  endDate = moment("2024-02-17T12:55").toDate(),
} = {}) => {
  const id = await getCalenderID();
  console.log(id, startDate, endDate);
  const events = await Calendar.getEventsAsync([id], startDate, endDate);
  let dataKeys = await AsyncStorage.getAllKeys();
  dataKeys = dataKeys.filter((key) => {
    return key.match("@event:");
  });
  // console.log(dataKeys);
  const data = await AsyncStorage.multiGet(dataKeys);
  // console.log(data);

  const result = events.map((event) => {
    // console.log("data saved", data[dataKeys.indexOf(`@event:${event.id}`)][1]);
    return {
      ...event,
      attendees: JSON.parse(data[dataKeys.indexOf(`@event:${event.id}`)][1])
        .attendees,
    };
  });
  console.log("result", result);
  return result;
};

export const addEventToCalender = async ({
  onSuccess = () => {},
  onFailure = () => {},
  details = {
    startDate: moment("2024-02-16T12:35").toDate(),
    endDate: moment("2024-02-16T12:55").toDate(),
    title: "hi",
    accessLevel: Calendar.EventAccessLevel.OWNER,
    attendees: [1, 2, 4],
    // attendees:[1,2,4]
    // status: Calendar.EventStatus.,
  },
} = {}) => {
  const id = await getCalenderID();
  console.log(details.startDate, details.endDate);
  Calendar.createEventAsync(id, details)
    .then((id) => {
      AsyncStorage.setItem(
        `@event:${id}`,
        JSON.stringify({
          eventId: id,
          attendees: details.attendees.map((index) => {
            return {
              ...USERS[index],
              attending: USER_ATTENDING_STATES.UNSELECTED,
            };
          }),
        })
      )
        .then(onSuccess)
        .catch(onFailure);
    })
    .catch((err) => {
      console.log(err);
      onFailure();
    });
};
