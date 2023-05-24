import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSettings } from "../components/AppSettings";
import { NotFound } from "../components/NotFound";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DocumentList from "./DocumentList";
import Profile from "./Profile";
import Settings from "./Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Signature from "./Signature";
import Map from "./Map";
import Details from "./Details";
import ContactList from "./ContactList";
import CallScreen from "./Call";
import CallingScreen from "./Calling";
import IncomingCallScreen from "./IncomingCall";
// @ts-ignore
import { Voximplant } from "react-native-voximplant";
import { useContext, useEffect, useState } from "react";
import { getProviders } from "../util/helpers";
import { UserContext } from "../../App";
import { Alert } from "react-native";
import PDFViewer from "./PDFViewer";
import Schedule from "./Schedule";
import ScheduleForm from "./ScheduleForm";
import {
  BottomTabParamList,
  DocumentParamList,
  FormTabParamList,
} from "../types";
import FormList from "./FormList";
import FormProvider, { useForms } from "../context/FormProvider";
import PurchasedFormList from "./PurchasedFormList";
import PurchasedFormDetails from "./PurchasedFormDetails";
import { Entypo } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import Home from "./Home";
import WhoWillSign from "./WhoWillSign";
import SelectTemplate from "./SelectTemplate";

const Stack = createStackNavigator<DocumentParamList>();
const TopTabs = createMaterialTopTabNavigator<FormTabParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

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
    <Stack.Navigator initialRouteName="DocumentList">
      <Stack.Screen
        name="DocumentList"
        component={DocumentList}
        options={{ title: "Documents" }}
      />
      <Stack.Screen
        name="PDFViewer"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={PDFViewer}
      />
      <Stack.Screen
        name="WhoWillSign"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={WhoWillSign}
      />
      <Stack.Screen
        name="SelectTemplate"
        options={{ title: appSettings.t("settings"), headerShown: false }}
        component={SelectTemplate}
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
    <Stack.Navigator initialRouteName="MapHome">
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
        name="Schedule"
        component={Schedule}
        options={{ title: appSettings.t("Schedule"), headerShown: false }}
      />
      <Stack.Screen
        name="ScheduleForm"
        component={ScheduleForm}
        options={{ title: appSettings.t("ScheduleForm"), headerShown: false }}
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
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{ headerShown: false }}
      />

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

  function convertCodeMessage(code: number) {
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

  function showLoginError(message: string) {
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
      } catch (e: any) {
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
  const { savedForms } = useForms();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        options={{
          title: appSettings.t("Documents"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="documents" size={24} color={color} />
          ),
        }}
        component={SignatureStack}
      />
      <BottomTab.Screen
        name="Map"
        options={{
          title: appSettings.t("Map"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" size={30} color={color} />
          ),
        }}
        component={MapStack}
      />

      <BottomTab.Screen
        name="CallingStack"
        options={{
          title: appSettings.t("Calling"),

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="phone" size={30} color={color} />
          ),
        }}
        component={CallNavigation}
      />

      <BottomTab.Screen
        name="Forms"
        options={{
          title: appSettings.t("Forms"),
          headerRight: (props) => (
            <Badge {...props} style={{ margin: 15 }}>
              {10 - savedForms.length + "$"}
            </Badge>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-lock"
              size={24}
              color={color}
            />
          ),
        }}
        component={FormTopStack}
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

const PurchasedFormStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="PurchasedFormList">
      <Stack.Screen
        name="PurchasedFormList"
        component={PurchasedFormList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PurchasedFormDetails"
        options={{
          title: appSettings.t("PurchasedFormDetails"),
          headerShown: false,
        }}
        component={PurchasedFormDetails}
      />
    </Stack.Navigator>
  );
};
// SignedIn
const FormTopStack = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();
  const appSettings = useAppSettings();

  const screenOptions = {
    tabBarStyle: {
      // paddingTop: insets.top,
    },
  };

  return (
    <TopTabs.Navigator
      initialRouteName="FormList"
      screenOptions={screenOptions}
    >
      <TopTabs.Screen
        name="FormList"
        options={{
          title: appSettings.t("FormList"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-lock"
              size={24}
              color={color}
            />
          ),
        }}
        component={FormList}
      />
      <TopTabs.Screen
        name="PurchasedForm"
        options={{
          title: appSettings.t("PurchasedForm"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-lock-open"
              size={24}
              color={color}
            />
          ),
        }}
        component={PurchasedFormStack}
      />
    </TopTabs.Navigator>
  );
};

const HomeNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DocumentHome"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignedIn"
      component={SignedIn}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

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
        component={DocumentList}
      />
      <TopTabs.Screen
        name="User"
        options={{ title: appSettings.t("userInfo") }}
        component={ProfileStack}
      />
    </TopTabs.Navigator>
  );
};

export default HomeNavigation;
