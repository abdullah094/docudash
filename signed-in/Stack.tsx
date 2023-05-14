import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSettings } from "../components/AppSettings";
import { NotFound } from "../components/NotFound";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GettingStarted from "./App";
import Profile from "./Profile";
import Settings from "./Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Signature from "./Signature";
import Map from "./Map";
import Details from "./Details";
import ContactsScreen from "./ContactsScreen";
import CallScreen from "./CallScreen";
import CallingScreen from "./CallingScreen";
import IncomingCallScreen from "./IncomingCallScreen";
import { Voximplant } from "react-native-voximplant";
import { useContext, useEffect, useState } from "react";
import { getProviders } from "../util/helpers";
import { UserContext } from "../App";
import { Alert } from "react-native";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const ProfileStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSettings"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={Settings}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: appSettings.t("NotFound") }}
      />
    </Stack.Navigator>
  );
};

const SignatureStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Documents"
        component={GettingStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signature"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={Signature}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: appSettings.t("NotFound") }}
      />
    </Stack.Navigator>
  );
};
const MapStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="MapHome"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={Details}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: appSettings.t("NotFound") }}
      />
    </Stack.Navigator>
  );
};

const CallNavigation = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Contacts" component={ContactsScreen} />

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
        <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SignedIn = () => {
  // Array of providers the the user is linked with

  const user = useContext(UserContext);
  const providers = getProviders(user);
  // const [login, setLogin] = useState(false);

  // docudash.wizard.n2.voximplant.com

  if (!user) {
    return null;
  }
  // const user.email.split("@")[0];
  // const username = "user1";
  console.log(user?.email?.split("@")[0]);
  const username = user?.email?.split("@")[0];
  const APP_NAME = "docudash";
  const ACC_NAME = "wizard.n2";
  const password = "123123";
  const voximplant = Voximplant.getInstance();

  function convertCodeMessage(code) {
    switch (code) {
      case 401:
        return "Invalid password";
      case 404:
        return "Invalid user";
      case 491:
        return "Invalid state";
      default:
        return "Try again later";
    }
  }

  function showLoginError(message) {
    Alert.alert("Login error", message, [
      {
        text: "OK",
      },
    ]);
  }

  useEffect(() => {
    const Login = async () => {
      try {
        let clientState = await voximplant.getClientState();
        if (clientState === Voximplant.ClientState.DISCONNECTED) {
          await voximplant.connect();
          await voximplant.login(
            `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`,
            password
          );
          console.log("connected");
        }
        if (clientState === Voximplant.ClientState.CONNECTED) {
          await voximplant.login(
            `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`,
            password
          );
          console.log("connected");
        }
      } catch (e) {
        let message;
        switch (e.name) {
          case Voximplant.ClientEvents.ConnectionFailed:
            message = "Connection error, check your internet connection";
            break;
          case Voximplant.ClientEvents.AuthResult:
            message = convertCodeMessage(e.code);
            break;
          default:
            message = "Unknown error. Try again";
        }
        showLoginError(message);
      }
    };

    Login();
  }, []);

  // useEffect(() => {
  //   const connect = async () => {
  //     const status = await voximplant.getClientState();
  //     if (status === Voximplant.ClientState.DISCONNECTED) {
  //       await voximplant.connect();
  //     } else if (status === Voximplant.ClientState.LOGGED_IN) {
  //       //do somthign here
  //     }
  //   };
  //   signIn();
  //   connect();
  // }, []);

  const signIn = async () => {
    try {
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      console.log(fqUsername);
      await voximplant.login(fqUsername, password);
    } catch (e) {
      console.log(e);
      // alert.alert(e.name, `Error code: ${e.code}`);
    }
  };

  const appSettings = useAppSettings();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        options={{
          title: appSettings.t("gettingStarted"),
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
        component={SignatureStack}
      />
      <BottomTab.Screen
        name="Map"
        options={{
          title: appSettings.t("Map"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={30}
              color={color}
            />
          ),
        }}
        component={MapStack}
      />

      <BottomTab.Screen
        name="CallingStack"
        options={{
          title: appSettings.t("Calling"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={30}
              color={color}
            />
          ),
        }}
        component={CallNavigation}
      />

      <BottomTab.Screen
        name="User"
        options={{
          title: appSettings.t("userInfo"),
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={30} color={color} />
          ),
        }}
        component={ProfileStack}
      />
    </BottomTab.Navigator>
  );
};
// SignedIn
const TopTabStack = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();
  const appSettings = useAppSettings();

  const screenOptions = {
    tabBarStyle: {
      paddingTop: insets.top,
    },
  };

  return (
    <TopTabs.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <TopTabs.Screen
        name="Home"
        options={{ title: appSettings.t("gettingStarted") }}
        component={GettingStarted}
      />
      <TopTabs.Screen
        name="User"
        options={{ title: appSettings.t("userInfo") }}
        component={ProfileStack}
      />
    </TopTabs.Navigator>
  );
};

export default SignedIn;
