import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useForms } from "../context/FormProvider";
import { DocumentNavigationProps, Form } from "types";
import { List } from "react-native-paper";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

type FormItemProps = {
  form: Form;
};
export default function FormItem({ form }: FormItemProps) {
  const navigation =
    useNavigation<DocumentNavigationProps<"PurchasedFormList">>();

  const { isFormSaved, onToggleSaved } = useForms();

  const saved = isFormSaved(form);
  const firstName = form.name.split(" ")[0];
  const secondName = form.name.split(" ")[1];
  const name = saved
    ? firstName + " " + secondName
    : firstName.slice(0, 2) +
      "*".repeat(firstName.length - 2) +
      " " +
      secondName.slice(0, 2) +
      "*".repeat(secondName.length - 2);
  const description = saved
    ? form.email
    : form.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");

  const ShowAlert = () => {
    Alert.alert(
      "Buy This lead",
      "This will cost you 1 $ for this lead",
      [
        {
          text: "Buy",
          onPress: () => onToggleSaved(form),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <List.Item
      onPress={() =>
        saved
          ? navigation.navigate("PurchasedFormDetails", { form })
          : ShowAlert()
      }
      title={name}
      description={description}
      right={(props) => (
        <TouchableOpacity
          onPress={ShowAlert}
          style={tw`flex items-center justify-center`}
        >
          {!saved && <List.Icon {...props} icon="cart" />}
        </TouchableOpacity>
      )}
    />
  );
}
