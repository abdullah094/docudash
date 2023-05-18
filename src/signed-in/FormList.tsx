import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
// @ts-ignore
import { Voximplant } from "react-native-voximplant";
import dummyForms from "../../assets/data/forms.json";
import { UserContext } from "../../App";
import { Form, FormTabNavigationProps, RootNavigationProps } from "../types";
import { Divider, List } from "react-native-paper";

import FormItem from "../components/FormItem";

const FormList = () => {
  const user = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(dummyForms);

  const navigation = useNavigation<FormTabNavigationProps<"FormList">>();

  useEffect(() => {
    const newContacts = dummyForms.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);
  return (
    <View style={styles.page}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
        placeholder="Search..."
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredContacts}
        renderItem={({ item }) => <FormItem form={item} />}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    marginVertical: 10,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
});

export default FormList;
