// app/auth.js

import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () =>  {
  AsyncStorage.removeItem(USER_KEY);
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("user_id");
  AsyncStorage.removeItem("balance");
  AsyncStorage.removeItem("outputs");
  AsyncStorage.removeItem("keys");
};
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
