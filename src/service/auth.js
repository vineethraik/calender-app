import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const isUserLoggedIn = () => {
  return auth?.currentUser && !auth.currentUser?.isAnonymous;
};

export const loginWithPhoneNumber = (
  mobileNo,
  setConfirmCallback,
  verifier
) => {
  signInWithPhoneNumber(auth, mobileNo, verifier)
    .then((confirmCallback) => {
      setConfirmCallback(confirmCallback);
    })
    .catch((err) => {
      console.log(err);
    });
};
