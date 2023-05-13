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

const SignedIn = () => {
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
