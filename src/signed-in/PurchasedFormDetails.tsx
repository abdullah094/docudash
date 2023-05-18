import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../styles/constants";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import {
  DocumentNavigationProps,
  DocumentRouteProps,
  RootNavigationProps,
  RootRouteProps,
} from "types";

const { width, height } = Dimensions.get("window");
const PurchasedFormDetails = () => {
  const navigation =
    useNavigation<DocumentNavigationProps<"PurchasedFormDetails">>();
  const route = useRoute<DocumentRouteProps<"PurchasedFormDetails">>();
  const { form } = route.params;
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
    >
      <Text
        style={{
          color: Colors.black,
          width: width - 40,

          textAlign: "center",
          fontSize: 20,
          marginTop: 30,
        }}
      >
        Please fill the form to book a meeting with the notary
      </Text>

      <View style={styles.input_view}>
        <Text style={styles.input_heading}>Full Name</Text>
        <TextInput style={styles.input} value={form.name} editable={false} />
      </View>

      <View style={styles.input_view}>
        <Text style={styles.input_heading}>Phone#</Text>
        <TextInput
          style={styles.input}
          value={form["contact number"]}
          editable={false}
        />
      </View>

      <View style={styles.input_view}>
        <Text style={styles.input_heading}>Email</Text>
        <TextInput style={styles.input} value={form.email} editable={false} />
      </View>

      <View style={styles.input_view}>
        <Text style={styles.input_heading}>Message</Text>
        <TextInput
          editable={false}
          multiline
          style={styles.input}
          placeholder={form.message}
          selectTextOnFocus={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: Colors.green,
          justifyContent: "center",
          alignItems: "center",
          width: 200,
          height: 70,
          borderRadius: 40,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
          }}
        >
          Call
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PurchasedFormDetails;

const styles = StyleSheet.create({
  input_view: {
    width: width - 30,
    marginTop: 25,
  },
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: Colors.black,
  },
  input_heading: {
    color: Colors.black,
  },
});
