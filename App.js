import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "281834706725-pjmcmkmdo7hjk9m3qpec26iitnn922mp.apps.googleusercontent.com",
      androidClientId:
        "281834706725-pjmcmkmdo7hjk9m3qpec26iitnn922mp.apps.googleusercontent.com",
      offlineAccess: true,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      offlineAccess: true,
      hostedDomain: "",
      forceCodeForRefreshToken: false,
      accountName: "",
      iosClientId: "<FROM DEVELOPER CONSOLE>",
      googleServicePlistPath: "",
      openIdRealm: "",
      profileImageSize: 120,
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
      } else {
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.log("Error signing out", error);
    }
  };
  return (
    <View style={styles.container}>
      {!userInfo ? (
        <Button title="Sign in with Google" onPress={signIn} />
      ) : (
        <View>
          <Text>Welcome, {userInfo.user.name}!</Text>
          <Text>Email: {userInfo.user.email}</Text>
          <Image
            source={{ uri: userInfo.user.photo }}
            style={styles.profileImage}
          />
          <Button title="Sign out" onPress={signOut} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});
