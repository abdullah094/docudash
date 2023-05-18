import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, ImageSourcePropType } from "react-native/types";

export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  CallingStack: undefined;
  User: undefined;
};

export type RootRouteProps<RouteName extends keyof BottomTabParamList> =
  RouteProp<BottomTabParamList, RouteName>;

export type RootNavigationProps<RouteName extends keyof BottomTabParamList> =
  StackNavigationProp<BottomTabParamList, RouteName>;

export type DocumentParamList = {
  UserProfile: undefined;
  UserSettings: undefined;
  NotFound: undefined;
  DocumentList: undefined;
  PDFViewer: { path: string };
  Signature: { path: string };
  MapHome: undefined;
  Details: { name: string };
  ContactList: undefined;
  Call: undefined;
  Calling: { user: any; call: any; incomingCall: boolean; isIncomingCall: any };
  IncomingCall: { call: any };
};

export type DocumentRouteProps<RouteName extends keyof DocumentParamList> =
  RouteProp<DocumentParamList, RouteName>;

export type DocumentNavigationProps<RouteName extends keyof DocumentParamList> =
  StackNavigationProp<DocumentParamList, RouteName>;

export type SignOutParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  PhoneSignIn: undefined;
  NotFound: undefined;
};

export type SignOutRouteProps<RouteName extends keyof SignOutParamList> =
  RouteProp<SignOutParamList, RouteName>;

export type SignOutNavigationProps<RouteName extends keyof SignOutParamList> =
  StackNavigationProp<SignOutParamList, RouteName>;
