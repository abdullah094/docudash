import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, ImageSourcePropType } from "react-native/types";

/**
 * Types
 */
export type User = FirebaseAuthTypes.User | null;

/**
 * Contexts
 */

export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  CallingStack: undefined;
  User: undefined;
  Forms: undefined;
};

export type RootRouteProps<RouteName extends keyof BottomTabParamList> =
  RouteProp<BottomTabParamList, RouteName>;

export type RootNavigationProps<RouteName extends keyof BottomTabParamList> =
  StackNavigationProp<BottomTabParamList, RouteName>;

export type DocumentParamList = {
  SignedIn: undefined;
  UserProfile: undefined;
  UserSettings: undefined;
  NotFound: undefined;
  DocumentHome: undefined;
  DocumentList: undefined;
  PDFViewer: { path: string };
  Signature: { path: string };
  MapHome: undefined;
  Details: { name: string };
  ContactList: undefined;
  Call: undefined;
  Calling: {
    user: any;
    call?: any;
    // incomingCall?: boolean;
    isIncomingCall?: boolean;
  };
  IncomingCall: { call: any };
  Schedule: undefined;
  ScheduleForm: { date: string };
  PurchasedFormList: undefined;
  PurchasedFormDetails: { form: Form };
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

export type FormTabParamList = {
  FormList: undefined;
  PurchasedForm: undefined;
  Home: undefined;
  User: undefined;
};

export type FormTabRouteProps<RouteName extends keyof FormTabParamList> =
  RouteProp<FormTabParamList, RouteName>;

export type FormTabNavigationProps<RouteName extends keyof FormTabParamList> =
  StackNavigationProp<FormTabParamList, RouteName>;

export interface Form {
  id: number;
  name: string;
  email: string;
  "contact number": string;
  message: string;
}
