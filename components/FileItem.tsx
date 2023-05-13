import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useLinkTo, useNavigation } from "@react-navigation/native";

import * as mime from "react-native-mime-types";
import moment from "moment";

import { StackNavigationProp } from "@react-navigation/stack";
import { fileIcons } from "../util/Constants";
import { fileItem } from "../type";

import * as FileSystem from "expo-file-system";
type Props = {
  item: FileSystem.FileInfo;
};

export default function FileItem({ item }: Props) {
  // const linkTo = useLinkTo();

  const navigation = useNavigation();
  const itemMime = mime.lookup(item.uri) || " ";
  const itemType: string = item.isDirectory ? "dir" : itemMime.split("/")[0];
  const itemFormat: string = item.isDirectory ? "dir" : itemMime.split("/")[1];
  const fileName = item.uri.substring(item.uri.lastIndexOf("/") + 1);
  console.log(fileName, itemMime, itemType, itemFormat);
  const ThumbnailImage = ({ uri }) => {
    return (
      <Image
        style={styles.image}
        source={{
          uri,
        }}
      />
    );
  };

  const ItemThumbnail = () => {
    switch (itemType) {
      case "dir":
        return <Feather name="folder" size={35} />;
      case "image":
      case "video":
        return <ThumbnailImage uri={item.uri} />;
      case "audio":
        return <FontAwesome5 name="file-audio" size={35} />;
      case "font":
        return <FontAwesome5 name="font" size={35} />;
      case "application":
        return (
          <MaterialCommunityIcons
            name={fileIcons[itemFormat] || "file-outline"}
            size={35}
          />
        );
      case "text":
        return (
          <MaterialCommunityIcons
            name={fileIcons[itemFormat] || "file-outline"}
            size={35}
          />
        );
      default:
        return <Feather name="file" size={35} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.itemLeft}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Signature", { path: item.uri })}
        >
          <View style={styles.itemThumbnail}>
            {itemType && <ItemThumbnail />}
          </View>
          <View style={styles.itemDetails}>
            <Text numberOfLines={1} style={{ ...styles.fileName }}>
              {decodeURI(fileName)}
            </Text>
            <Text style={{ ...styles.fileDetailText }}>
              {moment(item.modificationTime * 1000).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  itemLeft: {
    height: "100%",
    width: "83%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemThumbnail: {
    height: "100%",
    marginLeft: 8,
    width: "17%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
    width: "83%",
    overflow: "hidden",
  },
  itemActionButton: {
    width: "8%",
    height: "100%",
  },
  image: {
    margin: 1,
    width: 40,
    height: 50,
    resizeMode: "cover",
    borderRadius: 5,
  },
  fileMenu: {
    marginRight: 5,
    height: 60,
    display: "flex",
    justifyContent: "center",
  },
  fileName: {
    fontSize: 15,
  },
  fileDetailText: {
    fontSize: 10,
  },
});
