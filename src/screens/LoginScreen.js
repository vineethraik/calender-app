import React, { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { isValidMobileNo, isValidOTP } from "../util/auth";
import { loginWithPhoneNumber } from "../service/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { app, auth } from "../../firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export function LoginScreen({ children, updateAuth }) {
  const [mobileNo, setMobileNo] = useState("");
  const [OTP, setOTP] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(null);
  const recaptchaVerifier = useRef(null);
  //

  const sendOTP = () => {
    if (isValidMobileNo(mobileNo)) {
      loginWithPhoneNumber(
        mobileNo,
        setConfirmCallback,
        recaptchaVerifier.current
      );
    } else {
      alert("not a valid number");
    }
  };

  const login = () => {
    if (isValidOTP(OTP) && isValidMobileNo(mobileNo) && confirmCallback) {
      confirmCallback
        .confirm(OTP)
        .then(() => {
          updateAuth();
          alert("logged in");
        })
        .catch((err) => {
          console.log("OTP error", err);
        });
    } else {
      alert("Invalid OTP or login");
    }
  };

  const disableLogin = () => {
    return !isValidMobileNo(mobileNo) || OTP === "";
  };

  // const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
  //   size: "invisible",
  // });

  return (
    <View style={styles.container}>
      <Image
        style={styles.login_image}
        source={require("./../../assets/login-page-image.png")}
      />
      <View style={styles.login_form_container}>
        <View style={styles.input_container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
            attemptInvisibleVerification={true}
          />
          <Image
            source={require("./../../assets/people.png")}
            style={styles.input_image}
          />
          <TextInput
            onChangeText={setMobileNo}
            value={mobileNo}
            keyboardType="phone-pad"
            placeholder="Mobile No."
            style={styles.input_field}
          />
          <View style={styles.divider} />
          <Text
            onPress={() => {
              sendOTP();
            }}
            style={styles.send_otp_button}
          >
            Send OTP
          </Text>
        </View>
        <View style={styles.input_container}>
          <Image
            source={require("./../../assets/key.png")}
            style={styles.input_image}
          />
          <TextInput
            onChangeText={setOTP}
            value={OTP}
            keyboardType="numeric"
            placeholder="Enter OTP"
            style={styles.input_field}
          />
        </View>
        <View
          onTouchEnd={() => {
            if (!disableLogin()) {
              login();
            }
          }}
          style={styles.login_button}
        >
          <Text style={styles.login_button_text}>Login</Text>
        </View>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",
    // height: "100%",
    // backgroundColor: "grey",
  },
  login_image: {
    height: "40%",
    resizeMode: "contain",
    marginBottom: "10%",
    aspectRatio: 8 / 9.75,
  },
  login_form_container: {
    width: "100%",
  },
  input_container: {
    flexDirection: "row",
    borderRadius: 20,
    margin: 10,
    backgroundColor: "#eee",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: "80%",
    marginHorizontal: 5,
    width: 2,
    backgroundColor: "#aaa",
  },
  send_otp_button: {
    margin: 10,
    fontSize: 20,
  },
  input_image: {
    width: 40,
    height: 40,
    margin: 5,
  },
  input_field: {
    fontSize: 24,
    flex: 1,
    margin: 10,
  },
  login_button: {
    borderRadius: 20,
    height: 70,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  login_button_text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
});
