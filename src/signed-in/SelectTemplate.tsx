import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontText from "../components/FontText";
import Colors from "../styles/constants";
import { Appbar } from "react-native-paper";
const SelectTemplate = ({ navigation }) => {
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ];
  return (
    <View style={{flex:1}}>
      <Appbar mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Select template" />
        <Appbar.Action
          icon="draw-pen"
          size={35}
          accessibilityLabel={"Sign"}
          onPress={() => navigation.navigate("PDFViewer")}
        />
      </Appbar>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          backgroundColor: "white",
        margin:10,
          borderWidth: 1,
          zIndex: 999,
          width:200,
          height:300
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginVertical: 10,
paddingVertical:5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
           
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <FontText
              text={"abdullah"}
              font={item.id}
              styles={[{ fontSize: 40, letterSpacing: 10, color: "black" }]}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectTemplate;

const styles = StyleSheet.create({});
